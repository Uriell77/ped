import sqlite3
import datetime



def crear(datos):
    #ingresa un usuario a la bd parametro datos es tupla en el orden de campos en bd`
    base = sqlite3.connect('user.db', check_same_thread=False)
    cursor = base.cursor()

    cursor.execute("INSERT INTO usuarios(nombre, correo, password) VALUES ('{0}', '{1}', '{2}')".format(datos[0], datos[1], datos[2]))
    base.commit()
    base.close()


def leer(dato):
    #busca registro por nombre o id
    base = sqlite3.connect('user.db', check_same_thread=False)
    cursor = base.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE id = ? OR nombre = ?", (dato, dato))
    respuesta = cursor.fetchone()
    base.close()
    return respuesta


def leertodo():
    #retorna toda la bd
    base = sqlite3.connect('user.db', check_same_thread=False)
    cursor = base.cursor()

    cursor.execute("SELECT * FROM usuarios")
    respuesta = cursor.fetchall()
    base.close()
    return respuesta



def editar(id, datos):
    #print(datos)
    base = sqlite3.connect('user.db', check_same_thread=False)
    cursor = base.cursor()

    cursor.execute("""UPDATE usuarios SET nombre ='{0}', correo='{1}', password='{2}', log='{3}', status='{4}', saldo='{5}' WHERE id = '{6}'""".format(datos[1],datos[2],datos[3],datos[4],datos[5],datos[6], id))
    base.commit()
    base.close()


def borrar(ide):
    base = sqlite3.connect('user.db', check_same_thread=False)
    cursor = base.cursor()

    cursor.execute("DELETE FROM usuarios WHERE id = {}".format(ide))
    base.commit()
    base.close()


def existe(datos):
    
    base = sqlite3.connect('user.db', check_same_thread=False)
    cursor = base.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE (nombre = ? OR correo = ?) AND password = ?", (datos[0], datos[0], datos[1]))
    if cursor.fetchall():
        base.close()
        return True
    else:
        base.close()
        return False

def log(dato):
    #parametro dato es el nombre
    datos = leer(dato)
    datos = list(datos)
    #print(datos)
    datos[4] = 'Conectado'
    #print(datos)
    datos = tuple(datos)
    #print(datos)
    #print(datos[0])
    editar(datos[0], datos)
    return True


def logout(dato):
    #parametro dato es el nombre
    datos = leer(dato)
    datos = list(datos)
    #print(datos)
    datos[4] = 'Desconectado'
    #print(datos)
    datos = tuple(datos)
    #print(datos)
    editar(datos[0], datos)
    return True
    
    
def counteo():
    plantilla = leertodo()[1:]
    cusuarios = len(plantilla)
    cconect = [i for i in plantilla if i[4]=='Conectado']
    cdesconect = cusuarios - (len(cconect))
    cactiv = [i for i in plantilla if i[5] =='Activo']
    cinactiv = cusuarios - (len(cactiv))
    aldia = [i for i in plantilla if i[6]>= 0.0]
    morosos = [i for i in plantilla if i[6]< 0.0]

    res =  (cusuarios, len(cconect), cdesconect, len(cactiv), cinactiv, len(aldia), len(morosos))
    return res



def recarga(id, ordenu):
    """para agregar una recarga en base de datos, la ordenu es una lista en el orden de la bd
    ejem: \'empresa,numero,monto\'
    """
    base = sqlite3.connect('user.db', check_same_thread=False)
    cursor = base.cursor()

    datosu = leer(id)
    time = str(datetime.datetime.now())
    cursor.execute("INSERT INTO recargas(id,nombre,time,orden) VALUES ('{0}', '{1}', '{2}', '{3}')".format(datosu[0], datosu[1], time[:time.index('.')], ordenu))
    base.commit()
    base.close()



def rec(li):
    '''Recibe una lista de 3 elemnetos que son empresa,numero,monto'''
    res = li.split(',')
    return res

def ListaRecargas(id):
    """Consulta la lista de recargas en bd de un usuario por medio del id"""

    base = sqlite3.connect('user.db', check_same_thread=False)
    cursor = base.cursor()

    datosu = leer(id)
    cursor.execute("SELECT * FROM recargas WHERE id = {}".format(id))

    res = cursor.fetchall()
    base.close()
    return res


def todarecarga():
    #retorna toda la bd de recargas
    base = sqlite3.connect('user.db', check_same_thread=False)
    cursor = base.cursor()

    cursor.execute("SELECT * FROM recargas")
    respuesta = cursor.fetchall()
    base.close()
    return respuesta


def delrec(ide, fech):
    #borra un registo de la base de datos recargas por la fecha
    base = sqlite3.connect('user.db', check_same_thread=False)
    cursor = base.cursor()
    cursor.execute("UPDATE recargas SET status = '{2}' WHERE nombre = '{0}' AND time = '{1}'".format(ide, fech, '1'))
    base.commit()
    base.close()
