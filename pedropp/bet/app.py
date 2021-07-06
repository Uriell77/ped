#! usr\bin\env python
# _*_ coding: utf-8 _*_
#Author Luis Hermoso
# GP System C.A.
#fecha 07/01/2021 11:07 PM



from flask import Flask, escape, request, render_template, url_for, redirect, flash, session, jsonify
import flask_wtf as wtf
from datetime import timedelta
import bd

app = Flask(__name__)
app.secret_key="secretoenlamontana"
app.config.update(SESSION_COOKIE_SAMESITE="lax")

fallas = {'nolog':'Usuario no esta Logueado', 'noacces':'Usuario sin acceso a esta area'}

@app.before_request
def session_manager():
    session.permanent = True
    #app.permanent_session_lifetime = timedelta(minutes=10)

@app.route('/')
def hello():
    #enrutado a pagina inicial
    return render_template('index.html')



@app.route('/layout')
def lay():
    return render_template('layout.html')



@app.route('/login', methods=['GET', 'POST'])
def log():
    #enrutado a login

    if request.method == 'POST':
        nombre = request.form['nombre']
        password = request.form['password']

        session.clear()
        session['name'] = nombre
        session['auth'] = 0

        if nombre =="" or password =="":
            flash("No hay datos")
            return render_template('login.html')
        else:
            datos = (nombre, password)
            try:
                if bd.existe(datos):
                    plantilla = bd.leertodo()
                    global data
                    data = bd.leer(nombre)
                    if nombre == str(data[1]) and password == str(data[3]) and (data[7]==1 or data[7] == 2):
                        session['auth'] = 1
                        flash('Bienvenido')
                        bd.log(str(nombre))
                        return redirect(url_for('layad', user=nombre, data=data))
                    else:
                        session['auth'] = 1
                        #flash("te haz logeado correctamente")
                        bd.log(str(nombre))
                        flash('Bienvenido')
                        return redirect(url_for('dash', user=nombre))
                else:
                    flash("Datos Incorrectos")
                    return redirect(url_for('log'))
            except ValueError:
                return render_template('login.html')
    else:
        return render_template('login.html')



@app.route('/registro', methods=['GET', 'POST'])
def reg():
    #enrutado a registro
    if request.method == 'POST':
        nombre = request.form['nombre']
        correo = request.form['correo']
        password = request.form['password']
        if nombre =="" or correo=="" or password =="":
            flash("No hay datos")
            return render_template('registro.html')
        else:
            datos = (nombre, correo, password)
            try:
                bd.crear(datos)
                flash("registro realizado")
                return redirect(url_for('log'))
            except ValueError:
                return render_template('registro.html')
            except sqlite3.IntegrityError:
                flash("Datos ya existen")
                return render_template('registro.html')
    else:
        return render_template('registro.html')



@app.route('/dashboard/<user>',  methods=['GET', 'POST'])
def dash(user):
    datav = bd.leer(bd.leer(user)[8])
    plantilla = bd.leertodo()
    if user == plantilla[0][1]:
        return render_template('fail.html', error=fallas['noacces'])
    else:
        if session['auth'] == 1 and session['name'] == user:
            data = bd.leer(user)
            #enrutado a dashboard
            #flash('Bienvenido')

            return render_template('dashboard.html', user=user, saldo=data[6], divisa=datav[9]) 
        else:
            return render_template('fail.html', error = fallas['nolog'])


@app.route('/recargas/<user>', methods=['GET', 'POST'])
@app.route('/recargas', methods=['GET', 'POST'])
def rec(user):
    saldo = bd.leer(user)[6]
    ide = bd.leer(user)[0]
    data = bd.leer(ide)
    datav = bd.leer(data[8])
    histo = bd.ListaRecargas(data[0])
    if session['auth'] == 1 and  session['name'] == user:
        if request.args.get('numero')!= None:
            empresa = request.args.get('empresa')
            numero = request.args.get('numero')
            monto = request.args.get('monto')
            rec = "{},{},{}".format(empresa,numero,monto)
            ide = bd.leer(user)[0]
            saldo = bd.leer(user)[6]
            data = bd.leer(ide)
            data = list(data)
            if float(monto) <= float(saldo):
                try:
                    bd.recarga(ide, rec)

                    data[6] = float(data[6]) - float(monto)
                    data = tuple(data)
                    bd.editar(ide, data)
                    flash('recarga realizada')
                    return redirect(url_for('rec', user=user, saldo=saldo, histo=histo, paneldic=data[7], divisa=datav[9]))
                except:
                    flash('Recarga Fallida')
                    return redirect(url_for('rec', user=user, saldo=saldo, histo=histo, paneldic=data[7], divisa=datav[9]))
            else:
                flash('Saldo Insuficiente')
                return redirect(url_for('rec', user=user, saldo=saldo, histo=histo, paneldic=data[7], divisa=datav[9]))
        else:
            return render_template('recargas.html', user=user, saldo=saldo, histo=histo, paneldic=data[7], divisa=datav[9])

    else:
        return render_template('fail.html', error=fallas['nolog'])




@app.route('/cuentas/<user>', methods=['GET', 'POST'])
@app.route('/cuentas', methods=['GET', 'POST'])
def cuent(user):
    data = bd.leer(user)
    saldo = bd.leer(user)[6]
    histo = bd.ListaCuentas(data[0])
    datav = bd.leer(data[8])
    if session['auth'] == 1 and  session['name'] == user:
        if request.args.get('numero')!= None:
            empresa = request.args.get('empresa')
            numero = request.args.get('numero')
            ide = bd.leer(user)[0]
            saldo = bd.leer(user)[6]
            data = bd.leer(ide)
            data = list(data)
            monto = bd.leer_serv(empresa)
            monto = monto[2] * numero
            if float(monto) <= float(saldo):
                try:
                    bd.cuentas(ide, numero, empresa)
                    data[6] = float(data[6]) - float(monto)
                    data = tuple(data)
                    bd.editar(ide, data)
                    flash('Pantallas Solicitadas')
                    return redirect(url_for('cuent', user=user, saldo=saldo, panedic=data[7], histo=histo, divisa=datav[9]))
                except:
                    flash('Recarga Fallida')
                    return redirect(url_for('cuent', user=user, saldo=saldo, paneldic=data[7], histo=histo, divisa=datav[9]))
            else:
                flash('Saldo Insuficiente')
                return redirect(url_for('cuent', user=user, saldo=saldo, paneldic=data[7], histo=histo, divisa=datav[9]))
        else:
            return render_template('cuentas.html', user=user, saldo=saldo, paneldic=data[7], histo=histo, divisa=datav[9])

    else:
        return render_template('fail.html', error=fallas['nolog'])








@app.route('/documentacion', methods=['GET', 'POST'])
def doc():
    return render_template('documentacion.html')



@app.route('/dashboard1/<user>', methods=['GET', 'POST'])
def layad(user):
    cuenta = bd.counteo()
    plantilla = bd.leertodo()
    lorden = bd.todarecarga()
    data = bd.leer(user)
    datav = bd.leer(data[8])
    
    if data[7] > 2 :
        return render_template('fail.html', error=fallas['noacces'])
    else:
        if session['auth'] == 1 and session['name'] == str(data[1]):
            #flash('Bienvvenido')
            if request.method == 'POST':
                accion = request.form
                if accion['recargas'] == 'Confirmar':
                    ider = request.form['ider']
                    fecha = request.form['fecha']
                    ider = ider.rstrip()
                    bd.delrec(ider, fecha)
                    flash('Recarga  {0} {1} Aprobada'.format(ider, fecha))
                    return render_template('dashboard1.html', user=user, plantilla=plantilla, cuenta=cuenta, lorden=lorden, saldo=data[6], paneldic=data[7], data=data, divisa=datav[9])
                else:
                    ider = request.form['ider2']
                    fecha = request.form['fecha2']
                    ider = ider.rstrip()
                    bd.delcuent(ider, fecha)
                    flash('Cuenta  {0} {1} Aprobada'.format(ider, fecha))
                    return render_template('dashboard1.html', user=user, plantilla=plantilla, cuenta=cuenta, lorden=lorden, saldo=data[6], paneldic=data[7], data=data, divisa=datav[9])
            return render_template('dashboard1.html', user=user, plantilla=plantilla, cuenta=cuenta, lorden=lorden, saldo=data[6], paneldic=data[7], data=data, divisa=datav[9])

        else:
            return render_template('fail.html', error=fallas['noacces'])



@app.route('/logout')
def logout():
    #print(session['name'])
    bd.logout(session['name'])
    session.clear()
    session['name'] = 'unknown'
    session['auth'] = 0
    cuenta = bd.counteo()
    return redirect(url_for('hello'))




@app.route('/fail')
def fail(fail):
    return render_template('fail.html', error=fail)




@app.route('/api/datos/', methods=['GET'])
def json():
    datos = request.args.get('datos')
    if datos == 'todo':
        datos = bd.leertodo()
        return jsonify(datos)
    elif datos == 'cuenta':
        datos = bd.counteo()
        return jsonify(datos)
    elif datos == 'rec':
        datos = bd.todarecarga()
        return jsonify(datos)
    elif datos == 'cuentas':
        datos = bd.todacuenta()
        return jsonify(datos)
    return "Api de datos"




@app.route('/lista')
def lista():
    data = bd.leer(user)
    plantilla = bd.leertodo()
    lorden = bd.todarecarga()
    return render_template('lista.html', plantilla = plantilla)


@app.route('/ordenes', methods=['GET', 'POST'])
def ordenes():
    if request.method == 'GET':
        lorden = bd.todarecarga()
        data = bd.leer(user)
        return render_template('ordenes.html', lorden=lorden, data=data)
    #else:
     #   ider = request.form['ider']
      #  fecha = request.form['fecha']
       # ider = ider.rstrip()
       # bd.delrec(ider, fecha)
       # flash('Recarga  {0} {1} Aprobada'.format(ider, fecha))
       # return redirect(url_for('layad'))
             
    #else:
     #   lorden = bd.todarecarga()
      #  ider = request.form['ider']
       # fecha = request.form['fecha']
        #retuurn ider,fecha




@app.route('/ordenesc', methods=['GET', 'POST'])
def ordenesc():
    if request.method == 'GET':
        lorden = bd.todacuenta()
        data = bd.leer(user)
        return render_template('ordenesc.html', lorden2=lorden, data=data)
   # f request.method == 'POST':
    #    ider = request.form['ider2']
     #   fecha = request.form['fecha2']
      #  ider = ider.rstrip()
       # bd.delcuent(ider, fecha)
        #flash('cuenta  {0} {1} Aprobada'.format(ider, fecha))
       # return render_template('dashboard1.html', user=user, plantilla=plantilla, cuenta=cuenta, lorden=lorden, saldo=data[6], paneldic=data[7], data=data)

