import { Request, Response } from "express";
import Work from "../models/Work";

class WorkController {

    static async getWorks(req: Request, res: Response): Promise<void> {
        const listWorks = await Work.findAll()

        res.json(listWorks)
    }

    static async getWork(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const work = await Work.findByPk(id);

        if (work) {
            res.json(work)
        } else {
            res.status(404).json({
                msg: `No existe un work con el id ${id}`
            })
        }
    }

    static async deleteWork(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const work = await Work.findByPk(id);

        if (!work) {
            res.status(404).json({
                responseCode: 10010,
                responseMessage: `No existe un work con el id ${id}`
            })
        } else {
            await work?.destroy();
            res.json({
                msg: 'El work fue eliminado con exito!'
            })
        }
    }

    static async postWork(req: Request, res: Response): Promise<void> {
        const work = new Work(req.body);
        try {
            await work.save();

            res.json({
                msg: 'El work fue agregado con exito!'
            })
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al insertar el work!'
            })
        }
    }

    static async updateWork(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const { id } = req.params;

        const work = await Work.findByPk(id);
        try {
            if (work) {
                await work.update(body);
                res.json({
                    msg: 'El work fue actualizado con exito!'
                })
            } else {
                res.status(404).json({
                    msg: `No existe un work con el id ${id}`
                })
            }
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al actualizar el work!'
            })
        }
    }

    static async getDocumentation(req: Request, res: Response) {
        res.send(html);
    }
    
}

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" /> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Documentación Pro Service</title>
  </head>
  <body>
    <h1>Pro Service API (Gastón Langellotti)</h1>
  </body>
  <h2>Rutas</h2>
    <ul>
    <li><code>GET /</code> - Obtener la documentación de la API</li>
    <li><code>POST /usuario</code> - Crear un nuevo usuario</li>
    <li><code>DELETE /usuario/:id</code> - Borrar un usuario por ID</li>
    <li><code>PUT /usuario</code> - Actualizar un usuario</li>
    <li><code>GET /usuario</code> - Obtener todos los usuarios</li>
    <li><code>GET /usuario/:token</code> - Obtener un usuario por token</li>
    <li><code>GET /tipos-usuario</code> - Obtener los tipos de usuario</li>
    <li><code>POST /prestador</code> - Crear un nuevo prestador</li>
    <li><code>GET /prestador</code> - Obtener todos los prestadores</li>
    <li><code>GET /prestador/:idPrestador</code> - Obtener un prestador por ID</li>
    <li><code>GET /promedio-calificacion/:idPrestador</code> - Obtener el promedio de calificación de un prestador</li>
    <li><code>DELETE /prestador/:idPrestador</code> - Borrar un prestador por ID</li>
    <li><code>PUT /prestador</code> - Actualizar un prestador</li>
    <li><code>POST /consumidor</code> - Crear un nuevo consumidor</li>
    <li><code>GET /consumidor/:idConsumidor</code> - Obtener un consumidor por ID</li>
    <li><code>GET /consumidor</code> - Obtener todos los consumidores</li>
    <li><code>PUT /consumidor</code> - Actualizar un consumidor</li>
    <li><code>POST /trabajo</code> - Crear un nuevo trabajo</li>
    <li><code>POST /servicio</code> - Crear un nuevo servicio</li>
    <li><code>GET /trabajo</code> - Obtener todos los trabajos</li>
    <li><code>GET /trabajo/:idTrabajo</code> - Obtener un trabajo por ID</li>
    <li><code>GET /trabajo-consumidor/:token</code> - Obtener trabajos por consumidor</li>
    <li><code>GET /trabajo-prestador/:token</code> - Obtener trabajos por prestador</li>
    <li><code>POST /login</code> - Iniciar sesión de usuario</li>
    <li><code>POST /mensaje-a-prestador</code> - Enviar un mensaje de consumidor a prestador</li>
    <li><code>POST /mensaje-a-consumidor</code> - Enviar un mensaje de consumidor a prestador</li>
    <li><code>GET /mensaje-consumidor-enviado/:token</code> - Obtener mensajes de consumidor enviados</li>
    <li><code>DELETE /mensaje-consumidor-enviado/:token</code> - Borrar mensaje de consumidor enviado</li>
    <li><code>GET /mensaje-consumidor-recibido/:token</code> - Obtener mensajes de consumidor recibidos</li>
    <li><code>DELETE /mensaje-consumidor-recibido/:token</code> - Borrar mensaje de consumidor recibido</li>
    <li><code>GET /mensaje-prestador-enviado/:token</code> - Obtener mensajes de prestador enviados</li>
    <li><code>DELETE /mensaje-prestador-enviado/:token</code> - Borrar mensaje de prestador enviado</li>
    <li><code>GET /mensaje-prestador-recibido/:token</code> - Obtener mensajes de prestador recibidos</li>
    <li><code>DELETE /mensaje-prestador-recibido/:token</code> - Borrar mensaje de prestador recibido</li>
    <li><code>POST /roles</code> - Obtener roles para dar permisos</li>
    <li><code>POST /es-mi-trabajo-consumidor</code> - Saber si soy el dueño de ese trabajo como consumidor</li>
    <li><code>POST /es-mi-trabajo-prestador</code> - Saber si soy el dueño de ese trabajo como prestador</li>
    <li><code>PATCH /trabajo-estado/:idTrabajo</code> - Cambiar estado de trabajo</li>
    <li><code>PATCH /trabajo-prestador-asignado/:idTrabajo</code> - Asignar prestador a trabajo</li>
    <li><code>GET /prestador-id/:token</code> - Obtener id de prestador por token</li>
    <li><code>GET /consumidor-id/:token</code> - Obtener id de consumidor por token</li>
    <li><code>PATCH /trabajo-calificacion/:idTrabajo</code> - Calificar un trabajo</li>
    </ul>
  <h2>Rutas detalladas</h2>
    <ul>
    <li>
    <code>GET /</code> - Obtener la documentación de la API
    <p>
      Descripción: Esta ruta devuelve la documentación completa de la API
      en formato HTML.
    </p>
  </li>
  <li>
  <code>POST /usuario</code> - Crear un nuevo usuario
  <p>
    Descripción: Esta ruta permite crear un nuevo usuario en la base de
    datos. Se deben enviar los datos del usuario en el cuerpo de la
    solicitud en formato JSON.
  </p>
  <p>Parámetros:</p>
  <ul>
    <li>
      <code>nombre</code> (cadena, requerido) - El nombre del usuario.
    </li>
    <li>
      <code>apellido</code> (cadena, requerido) - El apellido del usuario.
    </li>
    <li>
      <code>email</code> (cadena, requerido) - El email del usuario.
    </li>
    <li>
      <code>password</code> (cadena, requerido) - La contraseña del
      usuario.
    </li>
    <li>
      <code>dni</code> (cadena, requerido) - El DNI del usuario.
    </li>
    <li>
      <code>telefono</code> (cadena, opcional) - El teléfono del usuario.
    </li>
    <li>
      <code>tipoDni</code> (cadena, opcional) - El tipo de DNI del usuario.
    </li>
    <li>
      <code>fotoPerfil</code> (cadena, opcional) - La foto de perfil del
      usuario.
    </li>
    <li>
      <code>fechaNacimiento</code> (cadena, requerido) - La fecha de
      nacimiento del usuario.
    </li>
  </ul>
  <p>Respuesta:</p>
  <p>
    La respuesta contiene el token de autenticación del usuario recién
    creado. Si hay algún error, se devuelve un mensaje de error
    correspondiente.
  </p>
  <p>Ejemplo de solicitud:</p>
  <pre>
    <code>
      POST /usuario HTTP/1.1
      Content-Type: application/json

      {
        "nombre": "John",
        "apellido": "Doe",
        "email": "johndoe@example.com",
        "password": "mypassword",
        "dni": "12345678",
        "telefono": "1234567890",
        "tipoDni": "DNI",
        "fotoPerfil": "https://example.com/profile.jpg",
        "fechaNacimiento": "1990-01-01"
      }
    </code>
  </pre>
  <p>Ejemplo de respuesta:</p>
  <pre>
    <code>
      HTTP/1.1 201 Created
      Content-Type: application/json

      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5MCwiaeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5MCwiaWF0IjoxNTE2MjM5MDIyfQ.3cRn-Vv-Eq6eH6Dq3F0PzJvVQZd3JXmWU8p1wKQyL6U"
    }
  </code>
</pre>
</li>
<li>
  <code>DELETE /usuario/:id</code> - Borrar un usuario
  <p>
    Descripción: Esta ruta permite borrar un usuario existente en la base de
    datos. Se debe proporcionar el ID del usuario a borrar como parte de la URL.
  </p>
  <p>Parámetros:</p>
  <ul>
    <li>
      <code>id</code> (entero, requerido) - El ID del usuario a borrar.
    </li>
  </ul>
  <p>Respuesta:</p>
  <p>
    La respuesta contiene un mensaje indicando si el usuario fue eliminado
    correctamente o si no se encontró ningún usuario con el ID proporcionado.
    Si hay algún error, se devuelve un mensaje de error correspondiente.
  </p>
  <p>Ejemplo de solicitud:</p>
  <pre>
    <code>
      DELETE /usuario/123 HTTP/1.1
    </code>
  </pre>
  <p>Ejemplo de respuesta:</p>
  <pre>
    <code>
      HTTP/1.1 200 OK
      Content-Type: application/json

      {
        "msg": "Usuario eliminado"
      }
    </code>
  </pre>
</li>
<li>
  <code>PUT /usuario</code> - Actualizar un usuario existente
  <p>
    Descripción: Esta ruta permite actualizar los datos de un usuario existente en la base de
    datos. Se deben proporcionar los datos actualizados del usuario, así como un token de autenticación válido.
  </p>
  <p>Parámetros de la solicitud:</p>
  <ul>
    <li>
      <code>token</code> (cadena, requerido) - El token de autenticación válido.
    </li>
    <li>
      <code>nombre</code> (cadena, opcional) - El nuevo nombre del usuario.
    </li>
    <li>
      <code>apellido</code> (cadena, opcional) - El nuevo apellido del usuario.
    </li>
    <li>
      <code>password</code> (cadena, opcional) - La nueva contraseña del usuario.
    </li>
    <li>
      <code>dni</code> (cadena, opcional) - El nuevo DNI del usuario.
    </li>
    <li>
      <code>telefono</code> (cadena, opcional) - El nuevo teléfono del usuario.
    </li>
    <li>
      <code>tipoDni</code> (cadena, opcional) - El nuevo tipo de documento del usuario.
    </li>
    <li>
      <code>fotoPerfil</code> (cadena, opcional) - La nueva foto de perfil del usuario.
    </li>
    <li>
      <code>fechaNacimiento</code> (cadena, opcional) - La nueva fecha de nacimiento del usuario.
    </li>
  </ul>
  <p>Respuesta:</p>
  <p>
    La respuesta contiene un mensaje indicando si el usuario fue actualizado correctamente. Si hay algún error, se devuelve un mensaje de error correspondiente.
  </p>
  <p>Ejemplo de solicitud:</p>
  <pre>
    <code>
      PUT /usuario HTTP/1.1
      Content-Type: application/json

      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5MCwiaWF0IjoxNTE2MjM5MDIyfQ.3cRn-Vv-Eq6eH6Dq3F0PzJvVQZd3JXmWU8p1wKQyL6U",
        "nombre": "Nuevo nombre",
        "apellido": "Nuevo apellido",
        "password": "Nueva contraseña",
        "dni": "Nuevo DNI",
        "telefono": "Nuevo teléfono",
        "tipoDni": "Nuevo tipo de documento",
        "fotoPerfil": "Nueva foto de perfil",
        "fechaNacimiento": "Nueva fecha de nacimiento"
      }
    </code>
  </pre>
  <p>Ejemplo de respuesta:</p>
  <pre>
    <code>
      HTTP/1.1 200 OK
      Content-Type: application/json

      {
        "msg": "Usuario actualizado"
      }
    </code>
  </pre>
</li>
<li>
  <code>GET /usuario</code> - Obtener todos los usuarios
  <p>
    Descripción: Esta ruta permite obtener todos los usuarios existentes en la base de datos.
  </p>
  <p>Parámetros:</p>
  <p>
    Esta ruta no requiere ningún parámetro adicional.
  </p>
  <p>Respuesta:</p>
  <p>
    La respuesta contiene un array de objetos JSON, donde cada objeto representa un usuario con sus respectivos datos. Si hay algún error, se devuelve un mensaje de error correspondiente.
  </p>
  <p>Ejemplo de solicitud:</p>
  <pre>
    <code>
      GET /usuario HTTP/1.1
    </code>
  </pre>
  <p>Ejemplo de respuesta:</p>
  <pre>
    <code>
      HTTP/1.1 200 OK
      Content-Type: application/json

      [
        {
          "id": 1,
          "nombre": "John",
          "apellido": "Doe",
          "email": "john.doe@example.com"
        },
        {
          "id": 2,
          "nombre": "Jane",
          "apellido": "Doe",
          "email": "jane.doe@example.com"
        },
        ...
      ]
    </code>
  </pre>
</li>
<li>
  <code>GET /usuario/:token</code> - Obtener un usuario por ID
  <p>
    Descripción: Esta ruta permite obtener un usuario específico por su ID. Se debe proporcionar un token de autenticación válido como parte de la URL.
  </p>
  <p>Parámetros de la solicitud:</p>
  <ul>
    <li>
      <code>token</code> (cadena, requerido) - El token de autenticación válido.
    </li>
  </ul>
  <p>Respuesta:</p>
  <p>
    La respuesta contiene un objeto JSON que representa al usuario solicitado con sus respectivos datos. Si el token no es válido o no se encuentra ningún usuario con el ID proporcionado, se devuelve un mensaje de error correspondiente.
  </p>
  <p>Ejemplo de solicitud:</p>
  <pre>
    <code>
      GET /usuario/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5MCwiaWF0IjoxNTE2MjM5MDIyfQ.3cRn-Vv-Eq6eH6Dq3F0PzJvVQZd3JXmWU8p1wKQyL6U HTTP/1.1
    </code>
  </pre>
  <p>Ejemplo de respuesta:</p>
  <pre>
    <code>
      HTTP/1.1 200 OK
      Content-Type: application/json

      {
        "id": 1,
        "nombre": "John",
        "apellido": "Doe",
        "email": "john.doe@example.com",
        "tipo": {
          "id": 1,
          "nombre": "Administrador"
        }
      }
    </code>
  </pre>
</li>
<li>
  <code>GET /tipos-usuario</code> - Obtener tipos de usuario
  <p>
    Descripción: Esta ruta permite obtener todos los tipos de usuario existentes en la base de datos.
  </p>
  <p>Parámetros:</p>
  <p>
    Esta ruta no requiere ningún parámetro adicional.
  </p>
  <p>Respuesta:</p>
  <p>
    La respuesta contiene un array de objetos JSON, donde cada objeto representa un tipo de usuario con sus respectivos datos. Si hay algún error, se devuelve un mensaje de error correspondiente.
  </p>
  <p>Ejemplo de solicitud:</p>
  <pre>
    <code>
      GET /tipos-usuario HTTP/1.1
    </code>
  </pre>
  <p>Ejemplo de respuesta:</p>
  <pre>
    <code>
      HTTP/1.1 200 OK
      Content-Type: application/json

      [
        {
          "id": 1,
          "nombre": "Administrador"
        },
        {
          "id": 2,
          "nombre": "Usuario regular"
        },
        ...
      ]
    </code>
  </pre>
</li>
<li>
  <code>POST /prestador</code> - Crear prestador
  <p>
    Descripción: Esta ruta permite crear un nuevo prestador en el sistema. Se deben proporcionar los datos requeridos en el cuerpo de la solicitud.
  </p>
  <p>Parámetros de la solicitud:</p>
  <ul>
    <li>
      <code>cuilCuit</code> (cadena, requerido) - El número de CUIT/CUIL del prestador.
    </li>
    <li>
      <code>descripcion</code> (cadena, requerido) - La descripción del prestador.
    </li>
    <li>
      <code>fotosTrabajosRealizados</code> (array de cadenas, opcional) - Las fotos de trabajos realizados por el prestador.
    </li>
    <li>
      <code>horariosAtencion</code> (array de objetos JSON, opcional) - Los horarios de atención del prestador.
    </li>
    <li>
      <code>disponibilidad</code> (booleano, requerido) - La disponibilidad del prestador.
    </li>
    <li>
      <code>radioCobertura</code> (número entero, opcional) - El radio de cobertura del prestador.
    </li>
    <li>
      <code>token</code> (cadena, requerido) - El token de autenticación válido.
    </li>
  </ul>
  <p>Respuesta:</p>
  <p>
    La respuesta contiene un objeto JSON que representa al prestador creado con sus respectivos datos. Si hay algún error, se devuelve un mensaje de error correspondiente.
  </p>
  <p>Ejemplo de solicitud:</p>
  <pre>
    <code>
      POST /prestador HTTP/1.1
      Content-Type: application/json

      {
        "cuilCuit": "20345678901",
        "descripcion": "Prestador de servicios",
        "fotosTrabajosRealizados": ["https://example.com/foto1.jpg", "https://example.com/foto2.jpg"],
        "horariosAtencion": [
          {
            "dia": "Lunes",
            "horario": "9:00 AM - 5:00 PM"
          },
          {
            "dia": "Martes",
            "horario": "9:00 AM - 5:00 PM"
          }
        ],
        "disponibilidad": true,
        "radioCobertura": 10,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5MCwiaWF0IjoxNTE2MjM5MDIyfQ.3cRn-Vv-Eq6eH6Dq3F0PzJvVQZd3JXmWU8p1wKQyL6U"
      }
    </code>
  </pre>
  <p>Ejemplo de respuesta:</p>
  <pre>
    <code>
      HTTP/1.1 201 Created
      Content-Type: application/json

      {
        "id": 1,
        "cuilCuit": "20345678901",
        "descripcion": "Prestador de servicios",
        "fotosTrabajosRealizados": ["https://example.com/foto1.jpg", "https://example.com/foto2.jpg"],
                "horariosAtencion": [
                  {
                    "dia": "Lunes",
                    "horario": "9:00 AM - 5:00 PM"
                  },
                  {
                    "dia": "Martes",
                    "horario": "9:00 AM - 5:00 PM"
                  }
                ],
                "disponibilidad": true,
                "radioCobertura": 10,
                "usuarioId": 1234567890
              }
            }
          </code>
        </pre>
        </li>
        <li>
          <code>GET /prestador</code> - Obtener prestadores
          <p>
            Descripción: Esta ruta permite obtener una lista de prestadores que coinciden con un filtro específico. El filtro se pasa como un parámetro de consulta opcional.
          </p>
          <p>Parámetros de la solicitud:</p>
          <ul>
            <li>
              <code>filtro</code> (cadena, opcional) - El filtro para buscar prestadores. Si no se proporciona un filtro, se devolverán todos los prestadores.
            </li>
          </ul>
          <p>Respuesta:</p>
          <p>
            La respuesta contiene una lista de objetos JSON que representan a los prestadores encontrados. Si no se encuentran prestadores o hay algún error, se devuelve un mensaje de error correspondiente.
          </p>
          <p>Ejemplo de solicitud:</p>
          <pre>
            <code>
              GET /prestador?filtro=Servicios
            </code>
          </pre>
          <p>Ejemplo de respuesta:</p>
          <pre>
            <code>
              HTTP/1.1 200 OK
              Content-Type: application/json
        
              [
                {
                  "id": 1,
                  "cuilCuit": "20345678901",
                  "descripcion": "Prestador de servicios",
                  "fotosTrabajosRealizados": ["https://example.com/foto1.jpg", "https://example.com/foto2.jpg"],
                  "horariosAtencion": [
                    {
                      "dia": "Lunes",
                      "horario": "9:00 AM - 5:00 PM"
                    },
                    {
                      "dia": "Martes",
                      "horario": "9:00 AM - 5:00 PM"
                    }
                  ],
                  "disponibilidad": true,
                  "radioCobertura": 10,
                  "usuarioId": 1234567890,
                  "Usuario": {
                    "id": 1234567890,
                    "nombre": "John",
                    "apellido": "Doe",
                    "email": "john.doe@example.com"
                  }
                },
                {
                  "id": 2,
                  "cuilCuit": "30456789012",
                  "descripcion": "Prestador de servicios",
                  "fotosTrabajosRealizados": ["https://example.com/foto3.jpg", "https://example.com/foto4.jpg"],
                  "horariosAtencion": [
                    {
                      "dia": "Miércoles",
                      "horario": "9:00 AM - 5:00 PM"
                    },
                    {
                      "dia": "Jueves",
                      "horario": "9:00 AM - 5:00 PM"
                    }
                  ],
                  "disponibilidad": true,
                  "radioCobertura": 15,
                  "usuarioId": 2345678901,
                  "Usuario": {
                    "id": 2345678901,
                    "nombre": "Jane",
                    "apellido": "Smith",
                    "email": "jane.smith@example.com"
                  }
                }
              ]
            </code>
          </pre>
        </li>
        <li>
          <code>GET /prestador/:idPrestador</code> - Obtener prestador por ID
          <p>
            Descripción: Esta ruta permite obtener un prestador específico utilizando su ID.
          </p>
          <p>Parámetros de la solicitud:</p>
          <ul>
            <li>
              <code>idPrestador</code> (entero) - El ID del prestador que se desea obtener.
            </li>
          </ul>
          <p>Respuesta:</p>
          <p>
            La respuesta contiene un objeto JSON que representa al prestador encontrado. Si no se encuentra el prestador con el ID proporcionado, se devuelve un mensaje de error correspondiente.
          </p>
          <p>Ejemplo de solicitud:</p>
          <pre>
            <code>
              GET /prestador/1
            </code>
          </pre>
          <p>Ejemplo de respuesta:</p>
          <pre>
            <code>
              HTTP/1.1 200 OK
              Content-Type: application/json
        
              {
                "id": 1,
                "cuilCuit": "20345678901",
                "descripcion": "Prestador de servicios",
                "fotosTrabajosRealizados": ["https://example.com/foto1.jpg", "https://example.com/foto2.jpg"],
                "horariosAtencion": [
                  {
                    "dia": "Lunes",
                    "horario": "9:00 AM - 5:00 PM"
                  },
                  {
                    "dia": "Martes",
                    "horario": "9:00 AM - 5:00 PM"
                  }
                ],
                "disponibilidad": true,
                "radioCobertura": 10,
                "usuarioId": 1234567890,
                "Usuario": {
                  "id": 1234567890,
                  "nombre": "John",
                  "apellido": "Doe",
                  "email": "john.doe@example.com"
                }
              }
            </code>
          </pre>
        </li>
        <li>
          <code>GET /promedio-calificacion/:idPrestador</code> - Obtener promedio de calificación de prestador
          <p>
            Descripción: Esta ruta permite obtener el promedio de calificación de un prestador específico utilizando su ID.
          </p>
          <p>Parámetros de la solicitud:</p>
          <ul>
            <li>
              <code>idPrestador</code> (entero) - El ID del prestador del cual se desea obtener el promedio de calificación.
            </li>
          </ul>
          <p>Respuesta:</p>
          <p>
            La respuesta contiene un número decimal que representa el promedio de calificación del prestador. Si el prestador no tiene calificaciones o hay algún error, se devuelve un mensaje de error correspondiente.
          </p>
          <p>Ejemplo de solicitud:</p>
          <pre>
            <code>
              GET /promedio-calificacion/1
            </code>
          </pre>
          <p>Ejemplo de respuesta:</p>
          <pre>
            <code>
              HTTP/1.1 200 OK
              Content-Type: application/json
        
              4.5
            </code>
          </pre>
        </li>
        <li>
          <code>DELETE /prestador/:idPrestador</code> - Borrar prestador
          <p>
            Descripción: Esta ruta permite eliminar un prestador específico utilizando su ID.
          </p>
          <p>Parámetros de la solicitud:</p>
          <ul>
            <li>
              <code>idPrestador</code> (entero) - El ID del prestador que se desea eliminar.
            </li>
          </ul>
          <p>Respuesta:</p>
          <p>
            La respuesta contiene un objeto JSON con un mensaje indicando si el prestador fue eliminado correctamente o si ocurrió algún error.
          </p>
          <p>Ejemplo de solicitud:</p>
          <pre>
            <code>
              DELETE /prestador/1
            </code>
          </pre>
          <p>Ejemplo de respuesta (prestador eliminado):</p>
          <pre>
            <code>
              HTTP/1.1 200 OK
              Content-Type: application/json
        
              {
                "msg": "Prestador eliminado"
              }
            </code>
          </pre>
          <p>Ejemplo de respuesta (prestador no encontrado):</p>
          <pre>
            <code>
              HTTP/1.1 404 Not Found
              Content-Type: application/json
        
              {
                "msg": "Prestador no encontrado"
              }
            </code>
          </pre>
          <p>Ejemplo de respuesta (error interno):</p>
          <pre>
            <code>
              HTTP/1.1 500 Internal Server Error
              Content-Type: application/json
        
              {
                "error": "Mensaje de error"
              }
            </code>
          </pre>
        </li>
        <li>
          <code>PUT /prestador</code> - Actualizar prestador
          <p>
            Descripción: Esta ruta permite actualizar los datos de un prestador.
          </p>
          <p>Parámetros de la solicitud:</p>
          <ul>
            <li>
              <code>token</code> (string) - El token de autenticación del prestador.
            </li>
            <li>
              <code>cuil_cuit</code> (string) - El número de CUIL/CUIT del prestador.
            </li>
            <li>
              <code>descripcion</code> (string) - La descripción del prestador.
            </li>
            <li>
              <code>fotos_trabajos_realizados</code> (array de strings) - Las URLs de las fotos de trabajos realizados por el prestador.
            </li>
            <li>
              <code>horarios_atencion</code> (array de objetos) - Los horarios de atención del prestador. Cada objeto debe tener las propiedades "dia" (string) y "horario" (string).
            </li>
            <li>
              <code>disponibilidad</code> (boolean) - La disponibilidad del prestador.
            </li>
            <li>
              <code>radio_cobertura</code> (entero) - El radio de cobertura del prestador en kilómetros.
            </li>
          </ul>
          <p>Respuesta:</p>
          <p>
            La respuesta contiene un objeto JSON con un mensaje indicando si la cuenta del prestador fue actualizada correctamente o si ocurrió algún error.
          </p>
          <p>Ejemplo de solicitud:</p>
          <pre>
            <code>
              PUT /prestador
              Content-Type: application/json
        
              {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5MCJ9.hK9VVmgiqVJjB6Y6hA-0k5NMI2pJlNzZy6Q4Vg2ZVi8",
                "cuil_cuit": "20345678901",
                "descripcion": "Nuevo prestador",
                "fotos_trabajos_realizados": ["https://example.com/foto1.jpg", "https://example.com/foto2.jpg"],
                "horarios_atencion": [
                  {
                    "dia": "Lunes",
                    "horario": "9:00 AM - 5:00 PM"
                  },
                  {
                    "dia": "Martes",
                    "horario": "9:00 AM - 5:00 PM"
                  }
                ],
                "disponibilidad": true,
                "radio_cobertura": 10
              }
            </code>
          </pre>
          <p>Ejemplo de respuesta (cuenta actualizada con éxito):</p>
          <pre>
            <code>
              HTTP/1.1 200 OK
              Content-Type: application/json
        
              {
                "msg": "Cuenta actualizada con éxito"
              }
            </code>
          </pre>
          <p>Ejemplo de respuesta (prestador no encontrado):</p>
          <pre>
            <code>
              HTTP/1.1 404 Not Found
              Content-Type: application/json
        
              {
                "msg": "Prestador no encontrado"
              }
            </code>
          </pre>
          <p>Ejemplo de respuesta (error interno):</p>
          <pre>
            <code>
              HTTP/1.1 500 Internal Server Error
              Content-Type: application/json
          
              {
                "error": "Mensaje de error"
              }
            </code>
          </pre>
          </li>
          <li>
            <code>POST /consumidor</code> - Crear consumidor
            <p>
              Descripción: Esta ruta permite crear un nuevo consumidor.
            </p>
            <p>Parámetros de la solicitud:</p>
            <ul>
              <li>
                <code>metodoPago</code> (string) - El método de pago del consumidor.
              </li>
              <li>
                <code>token</code> (string) - El token de autenticación del usuario.
              </li>
            </ul>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene un objeto JSON con los datos del consumidor creado.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                POST /consumidor
                Content-Type: application/json
          
                {
                  "metodoPago": "Tarjeta de crédito",
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5MCJ9.hK9VVmgiqVJjB6Y6hA-0k5NMI2pJlNzZy6Q4Vg2ZVi8"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (consumidor creado con éxito):</p>
            <pre>
              <code>
                HTTP/1.1 201 Created
                Content-Type: application/json
          
                {
                  "id": 1,
                  "metodoPago": "Tarjeta de crédito",
                  "usuarioId": 1234567890,
                  "createdAt": "2022-01-01T12:00:00Z",
                  "updatedAt": "2022-01-01T12:00:00Z"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (error interno):</p>
            <pre>
              <code>
                HTTP/1.1 500 Internal Server Error
                Content-Type: application/json
          
                {
                  "error": "Mensaje de error"
                }
              </code>
            </pre>
          </li>
          <li>
            <code>GET /consumidor/:idConsumidor</code> - Obtener consumidor por ID
            <p>
              Descripción: Esta ruta permite obtener los datos de un consumidor específico mediante su ID.
            </p>
            <p>Parámetros de la solicitud:</p>
            <ul>
              <li>
                <code>idConsumidor</code> (entero) - El ID del consumidor.
              </li>
            </ul>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene un objeto JSON con los datos del consumidor encontrado.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                GET /consumidor/1
              </code>
            </pre>
            <p>Ejemplo de respuesta (consumidor encontrado):</p>
            <pre>
              <code>
                HTTP/1.1 200 OK
                Content-Type: application/json
          
                {
                  "id": 1,
                  "metodoPago": "Tarjeta de crédito",
                  "usuarioId": 1234567890,
                  "createdAt": "2022-01-01T12:00:00Z",
                  "updatedAt": "2022-01-01T12:00:00Z",
                  "Usuario": {
                    "id": 1234567890,
                    "nombre": "John Doe",
                    "email": "johndoe@example.com",
                    "createdAt": "2022-01-01T12:00:00Z",
                    "updatedAt": "2022-01-01T12:00:00Z"
                  }
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (consumidor no encontrado):</p>
            <pre>
              <code>
                HTTP/1.1 404 Not Found
                Content-Type: application/json
          
                {
                  "msg": "Consumidor no encontrado"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (error interno):</p>
            <pre>
              <code>
                HTTP/1.1 500 Internal Server Error
                Content-Type: application/json
          
                {
                  "error": "Mensaje de error"
                }
              </code>
            </pre>
          </li>
          <li>
            <code>GET /consumidor</code> - Obtener consumidores
            <p>
              Descripción: Esta ruta permite obtener todos los consumidores registrados.
            </p>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene un array de objetos JSON con los datos de los consumidores encontrados.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                GET /consumidor
              </code>
            </pre>
            <p>Ejemplo de respuesta (consumidores encontrados):</p>
            <pre>
              <code>
                HTTP/1.1 200 OK
                Content-Type: application/json
          
                [
                  {
                    "id": 1,
                    "metodoPago": "Tarjeta de crédito",
                    "usuarioId": 1234567890,
                    "createdAt": "2022-01-01T12:00:00Z",
                    "updatedAt": "2022-01-01T12:00:00Z",
                    "Usuario": {
                      "id": 1234567890,
                      "nombre": "John Doe",
                      "email": "johndoe@example.com",
                      "createdAt": "2022-01-01T12:00:00Z",
                      "updatedAt": "2022-01-01T12:00:00Z"
                    }
                  },
                  {
                    "id": 2,
                    "metodoPago": "PayPal",
                    "usuarioId": 9876543210,
                    "createdAt": "2022-01-02T12:00:00Z",
                    "updatedAt": "2022-01-02T12:00:00Z",
                    "Usuario": {
                      "id": 9876543210,
                      "nombre": "Jane Smith",
                      "email": "janesmith@example.com",
                      "createdAt": "2022-01-02T12:00:00Z",
                      "updatedAt": "2022-01-02T12:00:00Z"
                    }
                  }
                ]
              </code>
            </pre>
            <p>Ejemplo de respuesta (error interno):</p>
            <pre>
              <code>
                HTTP/1.1 500 Internal Server Error
                Content-Type: application/json
          
                {
                  "error": "Mensaje de error"
                }
              </code>
            </pre>
          </li>
          <li>
            <code>PUT /consumidor</code> - Actualizar consumidor
            <p>
              Descripción: Esta ruta permite actualizar los datos de un consumidor.
            </p>
            <p>Parámetros de la solicitud:</p>
            <ul>
              <li>
                <code>token</code> (string) - El token de autenticación del usuario.
              </li>
              <li>
                <code>metodoPago</code> (string) - El nuevo método de pago del consumidor.
              </li>
            </ul>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene un objeto JSON con un mensaje de éxito en caso de que la actualización se realice correctamente.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                PUT /consumidor
                Content-Type: application/json
          
                {
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5MCJ9.hK9VVmgiqVJjB6Y6hA-0k5NMI2pJlNzZy6Q4Vg2ZVi8",
                  "metodoPago": "PayPal"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (cuenta actualizada con éxito):</p>
            <pre>
              <code>
                HTTP/1.1 200 OK
                Content-Type: application/json
          
                {
                  "msg": "Cuenta actualizada con éxito"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (consumidor no encontrado):</p>
            <pre>
              <code>
                HTTP/1.1 404 Not Found
                Content-Type: application/json
          
                {
                  "msg": "Consumidor no encontrado"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (error interno):</p>
            <pre>
              <code>
                HTTP/1.1 500 Internal Server Error
                Content-Type: application/json
          
                {
                  "error": "Mensaje de error"
                }
              </code>
            </pre>
          </li>
          <li>
            <code>POST /trabajo</code> - Crear trabajo
            <p>
              Descripción: Esta ruta permite crear un nuevo trabajo.
            </p>
            <p>Parámetros de la solicitud:</p>
            <ul>
              <li>
                <code>nombre</code> (string) - El nombre del trabajo.
              </li>
              <li>
                <code>fecha</code> (string) - La fecha del trabajo en formato "YYYY-MM-DD".
              </li>
              <li>
                <code>lugar</code> (string) - El lugar del trabajo.
              </li>
              <li>
                <code>rangoHorario</code> (string) - El rango horario del trabajo.
              </li>
              <li>
                <code>token</code> (string) - El token de autenticación del consumidor.
              </li>
              <li>
                <code>tareas</code> (array) - Un array de objetos JSON que representan las tareas del trabajo.
              </li>
            </ul>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene un objeto JSON con un mensaje de éxito en caso de que la creación se realice correctamente.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                POST /trabajo
                Content-Type: application/json
          
                {
                  "nombre": "Trabajo de ejemplo",
                  "fecha": "2022-01-01",
                  "lugar": "Ubicación de ejemplo",
                  "rangoHorario": "10:00 AM - 2:00 PM",
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5MCJ9.hK9VVmgiqVJjB6Y6hA-0k5NMI2pJlNzZy6Q4Vg2ZVi8",
                  "tareas": [
                    {
                      "nombre": "Tarea 1",
                      "descripcion": "Descripción de la tarea 1"
                    },
                    {
                      "nombre": "Tarea 2",
                      "descripcion": "Descripción de la tarea 2"
                    }
                  ]
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (trabajo creado):</p>
            <pre>
              <code>
                HTTP/1.1 201 Created
                Content-Type: application/json
          
                {
                  "msg": "Trabajo publicado"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (error interno):</p>
            <pre>
              <code>
                HTTP/1.1 500 Internal Server Error
                Content-Type: application/json
          
                {
                  "error": "Mensaje de error"
                }
              </code>
            </pre>
          </li>
          <li>
            <code>POST /servicio</code> - Crear servicio
            <p>
              Descripción: Esta ruta permite crear un nuevo servicio.
            </p>
            <p>Parámetros de la solicitud:</p>
            <ul>
              <li>
                <code>nombre</code> (string) - El nombre del servicio.
              </li>
              <li>
                <code>descripcion</code> (string) - La descripción del servicio.
              </li>
            </ul>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene el objeto JSON del servicio creado en caso de que la creación se realice correctamente.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                POST /servicio
                Content-Type: application/json
          
                {
                  "nombre": "Servicio de ejemplo",
                  "descripcion": "Descripción del servicio de ejemplo"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (servicio creado):</p>
            <pre>
              <code>
                HTTP/1.1 201 Created
                Content-Type: application/json
          
                {
                  "id": 1,
                  "nombre": "Servicio de ejemplo",
                  "descripcion": "Descripción del servicio de ejemplo",
                  "createdAt": "2022-01-01T00:00:00.000Z",
                  "updatedAt": "2022-01-01T00:00:00.000Z"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (error interno):</p>
            <pre>
              <code>
                HTTP/1.1 500 Internal Server Error
                Content-Type: application/json
          
                {
                  "error": "Mensaje de error"
                }
              </code>
            </pre>
          </li>
          <li>
            <code>GET /trabajo</code> - Obtener trabajos
            <p>
              Descripción: Esta ruta permite obtener una lista de trabajos que cumplan con ciertos criterios de filtro.
            </p>
            <p>Parámetros de la solicitud:</p>
            <ul>
              <li>
                <code>filtro</code> (string) - (Opcional) Un filtro de búsqueda para los trabajos. Si no se proporciona, se devolverán todos los trabajos.
              </li>
            </ul>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene un array de objetos JSON que representan los trabajos encontrados.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                GET /trabajo?filtro=ejemplo
              </code>
            </pre>
            <p>Ejemplo de respuesta (trabajos encontrados):</p>
            <pre>
              <code>
                HTTP/1.1 200 OK
                Content-Type: application/json
          
                [
                  {
                    "id": 1,
                    "nombre": "Trabajo de ejemplo",
                    "fecha": "2022-01-01",
                    "lugar": "Ubicación de ejemplo",
                    "rangoHorario": "10:00 AM - 2:00 PM",
                    "tareas": [
                      {
                        "nombre": "Tarea 1",
                        "descripcion": "Descripción de la tarea 1"
                      },
                      {
                        "nombre": "Tarea 2",
                        "descripcion": "Descripción de la tarea 2"
                      }
                    ],
                    "createdAt": "2022-01-01T00:00:00.000Z",
                    "updatedAt": "2022-01-01T00:00:00.000Z"
                  },
                  {
                    "id": 2,
                    "nombre": "Trabajo de ejemplo 2",
                    "fecha": "2022-01-02",
                    "lugar": "Ubicación de ejemplo 2",
                    "rangoHorario": "2:00 PM - 6:00 PM",
                    "tareas": [
                      {
                        "nombre": "Tarea 3",
                        "descripcion": "Descripción de la tarea 3"
                      },
                      {
                        "nombre": "Tarea 4",
                        "descripcion": "Descripción de la tarea 4"
                      }
                    ],
                    "createdAt": "2022-01-01T00:00:00.000Z",
                    "updatedAt": "2022-01-01T00:00:00.000Z"
                  }
                ]
              </code>
            </pre>
            <p>Ejemplo de respuesta (error interno):</p>
            <pre>
              <code>
                HTTP/1.1 500 Internal Server Error
                Content-Type: application/json
          
                {
                  "error": "Mensaje de error"
                }
              </code>
            </pre>
          </li>
          <li>
            <code>GET /trabajo/:idTrabajo</code> - Obtener trabajo por ID
            <p>
              Descripción: Esta ruta permite obtener un trabajo específico utilizando su ID.
            </p>
            <p>Parámetros de la solicitud:</p>
            <ul>
              <li>
                <code>idTrabajo</code> (number) - El ID del trabajo que se desea obtener.
              </li>
            </ul>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene un objeto JSON que representa el trabajo encontrado.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                GET /trabajo/1
              </code>
            </pre>
            <p>Ejemplo de respuesta (trabajo encontrado):</p>
            <pre>
              <code>
                HTTP/1.1 200 OK
                Content-Type: application/json
          
                {
                  "id": 1,
                  "nombre": "Trabajo de ejemplo",
                  "fecha": "2022-01-01",
                  "lugar": "Ubicación de ejemplo",
                  "rangoHorario": "10:00 AM - 2:00 PM",
                  "tareas": [
                    {
                      "nombre": "Tarea 1",
                      "descripcion": "Descripción de la tarea 1"
                    },
                    {
                      "nombre": "Tarea 2",
                      "descripcion": "Descripción de la tarea 2"
                    }
                  ],
                  "estado": {
                    "id": 6,
                    "nombre": "Publicado"
                  },
                  "calificacion": {
                    "id": 1,
                    "puntuacion": 4.5,
                    "comentario": "Buen trabajo"
                  },
                  "prestador": {
                    "id": 1,
                    "nombre": "Prestador de ejemplo",
                    "usuario": {
                      "nombre": "Usuario de ejemplo"
                    }
                  },
                  "createdAt": "2022-01-01T00:00:00.000Z",
                  "updatedAt": "2022-01-01T00:00:00.000Z"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (trabajo no encontrado):</p>
            <pre>
              <code>
                HTTP/1.1 404 Not Found
                Content-Type: application/json
          
                {
                  "error": "Trabajo no encontrado"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (error interno):</p>
            <pre>
              <code>
                HTTP/1.1 500 Internal Server Error
                Content-Type: application/json
          
                {
                  "error": "Mensaje de error"
                }
              </code>
            </pre>
          </li>
          <li>
            <code>GET /trabajo-consumidor/:token</code> - Obtener trabajos por consumidor
            <p>
              Descripción: Esta ruta permite obtener todos los trabajos asociados a un consumidor utilizando un token de autenticación.
            </p>
            <p>Parámetros de la solicitud:</p>
            <ul>
              <li>
                <code>token</code> (string) - El token de autenticación del consumidor.
              </li>
            </ul>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene un array JSON que representa los trabajos encontrados.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                GET /trabajo-consumidor/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY29uc3VtZWQiOiJDb25zdW1lcmlvciBlbCBleGVtcGxlIn0.ZW5jb2RlIHNvZnR3YXJl
              </code>
            </pre>
            <p>Ejemplo de respuesta (trabajos encontrados):</p>
            <pre>
              <code>
                HTTP/1.1 200 OK
                Content-Type: application/json
          
                [
                  {
                    "id": 1,
                    "nombre": "Trabajo 1",
                    "descripcion": "Descripción del trabajo 1",
                    "estado": {
                      "id": 6,
                      "nombre": "En proceso"
                    },
                    "calificacion": {
                      "id": 1,
                      "puntuacion": 4.5,
                      "comentario": "Buen trabajo"
                    },
                    "createdAt": "2022-01-01T00:00:00.000Z",
                    "updatedAt": "2022-01-01T00:00:00.000Z"
                  },
                  {
                    "id": 2,
                    "nombre": "Trabajo 2",
                    "descripcion": "Descripción del trabajo 2",
                    "estado": {
                      "id": 3,
                      "nombre": "Finalizado"
                    },
                    "calificacion": null,
                    "createdAt": "2022-01-02T00:00:00.000Z",
                    "updatedAt": "2022-01-03T00:00:00.000Z"
                  }
                ]
              </code>
            </pre>
            <p>Ejemplo de respuesta (trabajos no encontrados):</p>
            <pre>
              <code>
                HTTP/1.1 200 OK
                Content-Type: application/json
          
                []
              </code>
            </pre>
            <p>Ejemplo de respuesta (error de autenticación):</p>
            <pre>
              <code>
                HTTP/1.1 401 Unauthorized
                Content-Type: application/json
          
                {
                  "error": "Token inválido"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (error interno):</p>
            <pre>
              <code>
                HTTP/1.1 500 Internal Server Error
                Content-Type: application/json
          
                {
                  "error": "Mensaje de error"
                }
              </code>
            </pre>
          </li>
          <li>
            <code>GET /trabajo-prestador/:token</code> - Obtener trabajos por prestador
            <p>
              Descripción: Esta ruta permite obtener todos los trabajos asociados a un prestador utilizando un token de autenticación.
            </p>
            <p>Parámetros de la solicitud:</p>
            <ul>
              <li>
                <code>token</code> (string) - El token de autenticación del prestador.
              </li>
            </ul>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene un array JSON que representa los trabajos encontrados.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                GET /trabajo-prestador/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJlc3RhcG9k
              </code>
            </pre>
            <p>Ejemplo de respuesta (trabajos encontrados):</p>
            <pre>
              <code>
                HTTP/1.1 200 OK
                Content-Type: application/json
          
                [
                  {
                    "id": 1,
                    "nombre": "Trabajo 1",
                    "descripcion": "Descripción del trabajo 1",
                    "estado": {
                      "id": 6,
                      "nombre": "En proceso"
                    },
                    "calificacion": {
                      "id": 1,
                      "puntuacion": 4.5,
                      "comentario": "Buen trabajo"
                    },
                    "createdAt": "2022-01-01T00:00:00.000Z",
                    "updatedAt": "2022-01-01T00:00:00.000Z"
                  },
                  {
                    "id": 2,
                    "nombre": "Trabajo 2",
                    "descripcion": "Descripción del trabajo 2",
                    "estado": {
                      "id": 3,
                      "nombre": "Finalizado"
                    },
                    "calificacion": null,
                    "createdAt": "2022-01-02T00:00:00.000Z",
                    "updatedAt": "2022-01-03T00:00:00.000Z"
                  }
                ]
              </code>
            </pre>
            <p>Ejemplo de respuesta (trabajos no encontrados):</p>
            <pre>
              <code>
                HTTP/1.1 200 OK
                Content-Type: application/json
          
                []
              </code>
            </pre>
            <p>Ejemplo de respuesta (error de autenticación):</p>
            <pre>
              <code>
                HTTP/1.1 401 Unauthorized
                Content-Type: application/json
          
                {
                  "error": "Token inválido"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (error interno):</p>
            <pre>
              <code>
                HTTP/1.1 500 Internal Server Error
                Content-Type: application/json
          
                {
                  "error": "Mensaje de error"
                }
              </code>
            </pre>
          </li>
          <li>
            <code>POST /login</code> - Login usuario
            <p>
              Descripción: Esta ruta permite a un usuario iniciar sesión utilizando su email y contraseña.
            </p>
            <p>Parámetros de la solicitud:</p>
            <ul>
              <li>
                <code>email</code> (string) - El email del usuario.
              </li>
              <li>
                <code>password</code> (string) - La contraseña del usuario.
              </li>
            </ul>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene un objeto JSON que contiene el token de autenticación generado para el usuario.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                POST /login
                Content-Type: application/json
          
                {
                  "email": "juan@example.com",
                  "password": "password123"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (inicio de sesión exitoso):</p>
            <pre>
              <code>
                HTTP/1.1 200 OK
                Content-Type: application/json
          
                {
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRDb25zdW1pb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpZFBsZW1hZG9yIjo0LCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (email o contraseña incorrecta):</p>
            <pre>
              <code>
                HTTP/1.1 401 Unauthorized
                Content-Type: application/json
          
                {
                  "msg": "Email o contraseña incorrecta"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (error interno):</p>
            <pre>
              <code>
                HTTP/1.1 500 Internal Server Error
                Content-Type: application/json
          
                {
                  "error": "Mensaje de error"
                }
              </code>
            </pre>
          </li>
          <li>
            <code>POST /mensaje-a-prestador</code> - Mensaje de consumidor a prestador
            <p>
              Descripción: Esta ruta permite a un consumidor enviar un mensaje a un prestador, proporcionando un token de autenticación válido.
            </p>
            <p>Parámetros de la solicitud:</p>
            <ul>
              <li>
                <code>asunto</code> (string) - El asunto del mensaje.
              </li>
              <li>
                <code>mensaje</code> (string) - El contenido del mensaje.
              </li>
              <li>
                <code>token</code> (string) - El token de autenticación del consumidor.
              </li>
              <li>
                <code>idDestino</code> (number) - El ID del prestador al que se enviará el mensaje.
              </li>
            </ul>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene un objeto JSON que indica si el mensaje fue enviado correctamente.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                POST /mensaje-a-prestador
                Content-Type: application/json
          
                {
                  "asunto": "Consulta sobre servicios",
                  "mensaje": "Hola, me gustaría obtener más información sobre los servicios que ofrece.",
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRDb25zdW1pb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q",
                  "idDestino": 123
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (mensaje enviado):</p>
            <pre>
              <code>
                HTTP/1.1 200 OK
                Content-Type: application/json
          
                {
                  "msg": "Mensaje enviado"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (cuenta no válida):</p>
            <pre>
              <code>
                HTTP/1.1 401 Unauthorized
                Content-Type: application/json
          
                {
                  "msg": "Cuenta no válida"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (error interno):</p>
            <pre>
              <code>
                HTTP/1.1 500 Internal Server Error
                Content-Type: application/json
          
                {
                  "error": "Mensaje de error"
                }
              </code>
            </pre>
          </li>
          <li>
            <code>POST /mensaje-a-consumidor</code> - Mensaje de prestador a consumidor
            <p>
              Descripción: Esta ruta permite a un prestador enviar un mensaje a un consumidor, proporcionando un token de autenticación válido.
            </p>
            <p>Parámetros de la solicitud:</p>
            <ul>
              <li>
                <code>asunto</code> (string) - El asunto del mensaje.
              </li>
              <li>
                <code>mensaje</code> (string) - El contenido del mensaje.
              </li>
              <li>
                <code>token</code> (string) - El token de autenticación del prestador.
              </li>
              <li>
                <code>idDestino</code> (number) - El ID del consumidor al que se enviará el mensaje.
              </li>
            </ul>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene un objeto JSON que indica si el mensaje fue enviado correctamente.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                POST /mensaje-a-consumidor
                Content-Type: application/json
          
                {
                  "asunto": "Respuesta a consulta",
                  "mensaje": "Hola, aquí está la información que solicitaste.",
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRDb25zdW1pb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q",
                  "idDestino": 456
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (mensaje enviado):</p>
            <pre>
              <code>
                HTTP/1.1 200 OK
                Content-Type: application/json
          
                {
                  "msg": "Mensaje enviado"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (cuenta no válida):</p>
            <pre>
              <code>
                HTTP/1.1 401 Unauthorized
                Content-Type: application/json
          
                {
                  "msg": "Cuenta no válida"
                }
              </code>
            </pre>
            <p>Ejemplo de respuesta (error interno):</p>
            <pre>
              <code>
                HTTP/1.1 500 Internal Server Error
                Content-Type: application/json
          
                {
                  "error": "Mensaje de error"
                }
              </code>
            </pre>
          </li>
          <li>
            <code>GET /mensaje-consumidor-enviado/:token</code> - Obtener mensajes de consumidor enviados
            <p>
              Descripción: Esta ruta permite obtener los mensajes enviados por un consumidor, proporcionando un token de autenticación válido.
            </p>
            <p>Parámetros de la solicitud:</p>
            <ul>
              <li>
                <code>token</code> (string) - El token de autenticación del consumidor.
              </li>
            </ul>
            <p>Respuesta:</p>
            <p>
              La respuesta contiene un array de objetos JSON que representan los mensajes enviados por el consumidor.
            </p>
            <p>Ejemplo de solicitud:</p>
            <pre>
              <code>
                GET /mensaje-consumidor-enviado/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRDb25zdW1pb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q
              </code>
            </pre>
            <p>Ejemplo de respuesta:</p>
            <pre>
              <code>
                HTTP/1.1 200 OK
                Content-Type: application/json
          
                [
                  {
                    "id": 1,
                    "asunto": "Consulta sobre servicios",
                    "mensaje": "Hola, me gustaría obtener más información sobre los servicios que ofrece.",
                    "idOrigen": 1,
                    "idDestino": 123,
                    "createdAt": "2022-09-30T12:34:56Z",
                    "updatedAt": "2022-09-30T12:34:56Z",
                    "Prestador": {
                      "id": 123,
                      "nombre": "John Doe",
                      "direccion": "123 Main St",
                      "ciudad": "San Francisco",
                      "estado": "CA",
                      "descripcion": "Lorem ipsum dolor sit amet.",
                      "fotoPerfil": "https://example.com/profile.jpg",
                      "Usuario": {
                        "nombre": "John",
                        "apellido": "Doe",
                        "telefono": "123-456-7890"
                      }
                    }
                  },
                  {
                    "id": 2,
                    "asunto": "Consulta sobre precios",
                    "mensaje": "Hola, me gustaría saber cuánto cuesta el servicio.",
                    "idOrigen": 1,
                    "idDestino": 123,
                    "createdAt": "2022-09-29T12:34:56Z",
                    "updatedAt": "2022-09-29T12:34:56Z",
                    "Prestador": {
                      "id": 123,
                      "nombre": "John Doe",
                      "direccion": "123 Main St",
                      "ciudad": "San Francisco",
                      "estado": "CA",
                      "descripcion": "Lorem ipsum dolor sit amet.",
                      "fotoPerfil": "https://example.com/profile.jpg",
                      "Usuario": {
                        "nombre": "John",
                        "apellido": "Doe",
                        "telefono": "123-456-7890"
                      }
                    }
                  }
                ]
              </code>
            </pre>
              <p>Ejemplo de respuesta:</p>
              <pre>
                <code>
                  HTTP/1.1 200 OK
                  Content-Type: application/json
            
                  [
                    {
                      "id": 1,
                      "asunto": "Consulta sobre servicios",
                      "mensaje": "Hola, me gustaría obtener más información sobre los servicios que ofrece.",
                      "idOrigen": 1,
                      "idDestino": 123,
                      "createdAt": "2022-09-30T12:34:56Z",
                      "updatedAt": "2022-09-30T12:34:56Z",
                      "Prestador": {
                        "id": 123,
                        "nombre": "John Doe",
                        "direccion": "123 Main St",
                        "ciudad": "San Francisco",
                        "estado": "CA",
                        "descripcion": "Lorem ipsum dolor sit amet.",
                        "fotoPerfil": "https://example.com/profile.jpg",
                        "Usuario": {
                          "nombre": "John",
                          "apellido": "Doe",
                          "telefono": "123-456-7890"
                        }
                      }
                    },
                    {
                      "id": 2,
                      "asunto": "Consulta sobre precios",
                      "mensaje": "Hola, me gustaría saber cuánto cuesta el servicio.",
                      "idOrigen": 1,
                      "idDestino": 123,
                      "createdAt": "2022-09-29T12:34:56Z",
                      "updatedAt": "2022-09-29T12:34:56Z",
                      "Prestador": {
                        "id": 123,
                        "nombre": "John Doe",
                        "direccion": "123 Main St",
                        "ciudad": "San Francisco",
                        "estado": "CA",
                        "descripcion": "Lorem ipsum dolor sit amet.",
                        "fotoPerfil": "https://example.com/profile.jpg",
                        "Usuario": {
                          "nombre": "John",
                          "apellido": "Doe",
                          "telefono": "123-456-7890"
                        }
                      }
                    }
                  ]
                </code>
              </pre>
              <p>...</p>
            </li>
            <li>
              <code>DELETE /mensaje-consumidor-enviado/:token</code> - Borrar mensaje de consumidor enviado
              <p>
                Descripción: Esta ruta permite borrar un mensaje enviado por un consumidor, proporcionando un token de autenticación válido y el ID del mensaje a borrar.
              </p>
              <p>Parámetros de la solicitud:</p>
              <ul>
                <li>
                  <code>token</code> (string) - El token de autenticación del consumidor.
                </li>
              </ul>
              <p>Cuerpo de la solicitud:</p>
              <ul>
                <li>
                  <code>id</code> (number) - El ID del mensaje a borrar.
                </li>
              </ul>
              <p>Respuesta:</p>
              <p>
                La respuesta contiene un objeto JSON con el mensaje "Mensaje borrado" si el borrado se realizó correctamente.
              </p>
              <p>Ejemplo de solicitud:</p>
              <pre>
                <code>
                  DELETE /mensaje-consumidor-enviado/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRDb25zdW1pb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q
                  Content-Type: application/json
            
                  {
                    "id": 1
                  }
                </code>
              </pre>
              <p>Ejemplo de respuesta:</p>
              <pre>
                <code>
                  HTTP/1.1 200 OK
                  Content-Type: application/json
            
                  {
                    "msg": "Mensaje borrado"
                  }
                </code>
              </pre>
            </li>
            <li>
              <code>GET /mensaje-consumidor-recibido/:token</code> - Obtener mensajes de consumidor recibidos
              <p>
                Descripción: Esta ruta permite obtener los mensajes recibidos por un consumidor, proporcionando un token de autenticación válido.
              </p>
              <p>Parámetros de la solicitud:</p>
              <ul>
                <li>
                  <code>token</code> (string) - El token de autenticación del consumidor.
                </li>
              </ul>
              <p>Respuesta:</p>
              <p>
                La respuesta contiene un array de objetos JSON que representan los mensajes recibidos por el consumidor. Cada objeto contiene información detallada sobre el mensaje, incluyendo el prestador asociado.
              </p>
              <p>Ejemplo de solicitud:</p>
              <pre>
                <code>
                  GET /mensaje-consumidor-recibido/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRDb25zdW1pb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q
                </code>
              </pre>
              <p>Ejemplo de respuesta:</p>
              <pre>
                <code>
                  HTTP/1.1 200 OK
                  Content-Type: application/json
            
                  [
                    {
                      "id": 1,
                      "asunto": "Consulta sobre servicios",
                      "mensaje": "Hola, me gustaría obtener más información sobre los servicios que ofrece.",
                      "idOrigen": 1,
                      "idDestino": 123,
                      "createdAt": "2022-09-30T12:34:56Z",
                      "updatedAt": "2022-09-30T12:34:56Z",
                      "Prestador": {
                        "id": 123,
                        "nombre": "John Doe",
                        "direccion": "123 Main St",
                        "ciudad": "San Francisco",
                        "estado": "CA",
                        "descripcion": "Lorem ipsum dolor sit amet.",
                        "fotoPerfil": "https://example.com/profile.jpg",
                        "Usuario": {
                          "nombre": "John",
                          "apellido": "Doe",
                          "telefono": "123-456-7890"
                        }
                      }
                    },
                    {
                      "id": 2,
                      "asunto": "Consulta sobre precios",
                      "mensaje": "Hola, me gustaría saber cuánto cuesta el servicio.",
                      "idOrigen": 1,
                      "idDestino": 123,
                      "createdAt": "2022-09-29T12:34:56Z",
                      "updatedAt": "2022-09-29T12:34:56Z",
                      "Prestador": {
                        "id": 123,
                        "nombre": "John Doe",
                        "direccion": "123 Main St",
                        "ciudad": "San Francisco",
                        "estado": "CA",
                        "descripcion": "Lorem ipsum dolor sit amet.",
                        "fotoPerfil": "https://example.com/profile.jpg",
                        "Usuario": {
                          "nombre": "John",
                          "apellido": "Doe",
                          "telefono": 123-456-7890"
                                      }
                                    }
                                  }
                                ]
                              </code>
                            </pre>
                            <p>...</p>
                          </li>
    <li>
      <code>DELETE /mensaje-consumidor-recibido/:token</code> - Borrar mensaje de consumidor recibido
      <p>
        Descripción: Esta ruta permite borrar un mensaje recibido por un consumidor, proporcionando un token de autenticación válido y el ID del mensaje a borrar.
      </p>
      <p>Parámetros de la solicitud:</p>
      <ul>
        <li>
          <code>token</code> (string) - El token de autenticación del consumidor.
        </li>
      </ul>
      <p>Cuerpo de la solicitud:</p>
      <ul>
        <li>
          <code>id</code> (number) - El ID del mensaje a borrar.
        </li>
      </ul>
      <p>Respuesta:</p>
      <p>
        La respuesta contiene un objeto JSON con el mensaje "Mensaje borrado" si el borrado se realizó correctamente.
      </p>
      <p>Ejemplo de solicitud:</p>
      <pre>
        <code>
          DELETE /mensaje-consumidor-recibido/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRDb25zdW1pb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q
          Content-Type: application/json
    
          {
            "id": 1
          }
        </code>
      </pre>
      <p>Ejemplo de respuesta:</p>
      <pre>
        <code>
          HTTP/1.1 200 OK
          Content-Type: application/json
    
          {
            "msg": "Mensaje borrado"
          }
        </code>
      </pre>
    </li>
    <li>
      <code>GET /mensaje-prestador-enviado/:token</code> - Obtener mensajes de prestador enviados
      <p>
        Descripción: Esta ruta permite obtener los mensajes enviados por un prestador, proporcionando un token de autenticación válido.
      </p>
      <p>Parámetros de la solicitud:</p>
      <ul>
        <li>
          <code>token</code> (string) - El token de autenticación del prestador.
        </li>
      </ul>
      <p>Respuesta:</p>
      <p>
        La respuesta contiene un array de objetos JSON que representan los mensajes enviados por el prestador. Cada objeto contiene información detallada sobre el mensaje, incluyendo el consumidor asociado.
      </p>
      <p>Ejemplo de solicitud:</p>
      <pre>
        <code>
          GET /mensaje-prestador-enviado/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRQcmVzdGFkb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q
        </code>
      </pre>
      <p>Ejemplo de respuesta:</p>
      <pre>
        <code>
          HTTP/1.1 200 OK
          Content-Type: application/json
    
          [
            {
              "id": 1,
              "asunto": "Respuesta a consulta",
              "mensaje": "Hola, aquí tienes la información que solicitaste.",
              "idOrigen": 123,
              "idDestino": 1,
              "createdAt": "2022-09-30T12:34:56Z",
              "updatedAt": "2022-09-30T12:34:56Z",
              "Consumidor": {
                "id": 1,
                "nombre": "Jane Doe",
                "direccion": "456 Elm St",
                "ciudad": "San Francisco",
                "estado": "CA",
                "Usuario": {
                  "nombre": "Jane",
                  "apellido": "Doe",
                  "telefono": "123-456-7890"
                }
              }
            },
            {
              "id": 2,
              "asunto": "Confirmación de cita",
              "mensaje": "Hola, confirmo la cita para mañana a las 2 PM.",
              "idOrigen": 123,
              "idDestino": 1,
              "createdAt": "2022-09-29T12:34:56Z",
              "updatedAt": "2022-09-29T12:34:56Z",
              "Consumidor": {
                "id": 1,
                "nombre": "Jane Doe",
                "direccion": "456 Elm St",
                "ciudad": "San Francisco",
                "estado": "CA",
                "Usuario": {
                  "nombre": "Jane",
                  "apellido": "Doe",
                  "telefono": "123-456-7890"
                }
              }
            }
          ]
        </code>
      </pre>
      <p>...</p>
    </li>
    <li>
      <code>DELETE /mensaje-prestador-enviado/:token</code> - Borrar mensaje de prestador enviado
      <p>
        Descripción: Esta ruta permite borrar un mensaje enviado por un prestador, proporcionando un token de autenticación válido y el ID del mensaje a borrar.
      </p>
      <p>Parámetros de la solicitud:</p>
      <ul>
        <li>
          <code>token</code> (string) - El token de autenticación del prestador.
        </li>
      </ul>
      <p>Cuerpo de la solicitud:</p>
      <ul>
        <li>
          <code>id</code> (number) - El ID del mensaje a borrar.
        </li>
      </ul>
      <p>Respuesta:</p>
      <p>
        La respuesta contiene un objeto JSON con el mensaje "Mensaje borrado" si el borrado se realizó correctamente.
      </p>
      <p>Ejemplo de solicitud:</p>
      <pre>
        <code>
          DELETE /mensaje-prestador-enviado/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRQcmVzdGFkb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q
          Content-Type: application/json
    
          {
            "id": 1
          }
        </code>
      </pre>
      <p>Ejemplo de respuesta:</p>
      <pre>
        <code>
          HTTP/1.1 200 OK
          Content-Type: application/json
    
          {
            "msg": "Mensaje borrado"
          }
        </code>
      </pre>
    </li>
    <li>
      <code>GET /mensaje-prestador-recibido/:token</code> - Obtener mensajes de prestador recibidos
      <p>
        Descripción: Esta ruta permite obtener los mensajes recibidos por un prestador, proporcionando un token de autenticación válido.
      </p>
      <p>Parámetros de la solicitud:</p>
      <ul>
        <li>
          <code>token</code> (string) - El token de autenticación del prestador.
        </li>
      </ul>
      <p>Respuesta:</p>
      <p>
        La respuesta contiene un array de objetos JSON que representan los mensajes recibidos por el prestador. Cada objeto contiene información detallada sobre el mensaje, incluyendo el consumidor asociado.
      </p>
      <p>Ejemplo de solicitud:</p>
      <pre>
        <code>
          GET /mensaje-prestador-recibido/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRQcmVzdGFkb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q
        </code>
      </pre>
      <p>Ejemplo de respuesta:</p>
      <pre>
        <code>
          HTTP/1.1 200 OK
          Content-Type: application/json
    
          [
            {
              "id": 1,
              "asunto": "Consulta sobre servicios",
              "mensaje": "Hola, estoy interesado en contratar tus servicios. ¿Podemos hablar?",
              "idOrigen": 1,
              "idDestino": 123,
              "createdAt": "2022-09-30T12:34:56Z",
              "updatedAt": "2022-09-30T12:34:56Z",
              "Consumidor": {
                "id": 1,
                "nombre": "John Doe",
                "direccion": "123 Main St",
                "ciudad": "San Francisco",
                "estado": "CA",
                "Usuario": {
                  "nombre": "John",
                  "apellido": "Doe",
                  "telefono": "123-456-7890"
                }
              }
            },
            {
              "id": 2,
              "asunto": "Solicitud de presupuesto",
              "mensaje": "Hola, necesito un presupuesto para una obra en mi casa. ¿Puedes ayudarme?",
              "idOrigen": 1,
              "idDestino": 123,
              "createdAt": "2022-09-29T12:34:56Z",
              "updatedAt": "2022-09-29T12:34:56Z",
              "Consumidor": {
                "id": 1,
                "nombre": "John Doe",
                "direccion": "123 Main St",
                "ciudad": "San Francisco",
                "estado": "CA",
                "Usuario": {
                  "nombre": "John",
                  "apellido": "Doe",
                  "telefono": "123-456-7890"
                }
              }
            }
          ]
        </code>
      </pre>
      <p>...</p>
    </li>
    <li>
      <code>DELETE /mensaje-prestador-recibido/:token</code> - Borrar mensaje de prestador recibido
      <p>
        Descripción: Esta ruta permite borrar un mensaje recibido por un prestador, proporcionando un token de autenticación válido y el ID del mensaje a borrar.
      </p>
      <p>Parámetros de la solicitud:</p>
      <ul>
        <li>
          <code>token</code> (string) - El token de autenticación del prestador.
        </li>
      </ul>
      <p>Cuerpo de la solicitud:</p>
      <ul>
        <li>
          <code>id</code> (number) - El ID del mensaje a borrar.
        </li>
      </ul>
      <p>Respuesta:</p>
      <p>
        La respuesta contiene un objeto JSON con el mensaje "Mensaje borrado" si el borrado se realizó correctamente.
      </p>
      <p>Ejemplo de solicitud:</p>
      <pre>
        <code>
          DELETE /mensaje-prestador-recibido/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRQcmVzdGFkb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q
          Content-Type: application/json
    
          {
            "id": 1
          }
        </code>
      </pre>
      <p>Ejemplo de respuesta:</p>
      <pre>
        <code>
          HTTP/1.1 200 OK
          Content-Type: application/json
    
          {
            "msg": "Mensaje borrado"
          }
        </code>
      </pre>
    </li>
    <li>
      <code>POST /roles</code> - Obtener roles para dar permisos
      <p>
        Descripción: Esta ruta permite obtener los roles de un usuario autenticado para dar permisos en función de esos roles. Se requiere un token de autenticación válido para acceder a esta ruta.
      </p>
      <p>Cuerpo de la solicitud:</p>
      <ul>
        <li>
          <code>token</code> (string) - El token de autenticación del usuario.
        </li>
      </ul>
      <p>Respuesta:</p>
      <p>
        La respuesta contiene un objeto JSON con los valores booleanos de los roles del usuario (usuario, consumidor, prestador).
      </p>
      <p>Ejemplo de solicitud:</p>
      <pre>
        <code>
          POST /roles
          Content-Type: application/json
    
          {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRQcmVzdGFkb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q"
          }
        </code>
      </pre>
      <p>Ejemplo de respuesta:</p>
      <pre>
        <code>
          HTTP/1.1 200 OK
          Content-Type: application/json
    
          {
            "usuario": true,
            "consumidor": true,
            "prestador": false
          }
        </code>
      </pre>
    </li>
    <li>
      <code>POST /es-mi-trabajo-consumidor</code> - Saber si soy el dueño de ese trabajo como consumidor
      <p>
        Descripción: Esta ruta permite verificar si el usuario autenticado como consumidor es el dueño de un trabajo específico. Se requiere un token de autenticación válido y el ID del trabajo para acceder a esta ruta.
      </p>
      <p>Cuerpo de la solicitud:</p>
      <ul>
        <li>
          <code>token</code> (string) - El token de autenticación del consumidor.
        </li>
        <li>
          <code>idTrabajo</code> (number) - El ID del trabajo a verificar.
        </li>
      </ul>
      <p>Respuesta:</p>
      <p>
        La respuesta contiene un objeto JSON con el mensaje "true" si el consumidor es el dueño del trabajo, o "false" si no lo es.
      </p>
      <p>Ejemplo de solicitud:</p>
      <pre>
        <code>
          POST /es-mi-trabajo-consumidor
          Content-Type: application/json
    
          {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRQcmVzdGFkb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q",
            "idTrabajo": 1
          }
        </code>
      </pre>
      <p>Ejemplo de respuesta:</p>
      <pre>
        <code>
          HTTP/1.1 200 OK
          Content-Type: application/json
    
          {
            "msg": true
          }
        </code>
      </pre>
    </li>
    <li>
      <code>POST /es-mi-trabajo-prestador</code> - Saber si soy el dueño de ese trabajo como prestador
      <p>
        Descripción: Esta ruta permite verificar si el usuario autenticado como prestador es el dueño de un trabajo específico. Se requiere un token de autenticación válido y el ID del trabajo para acceder a esta ruta.
      </p>
      <p>Cuerpo de la solicitud:</p>
      <ul>
        <li>
          <code>token</code> (string) - El token de autenticación del prestador.
        </li>
        <li>
          <code>idTrabajo</code> (number) - El ID del trabajo a verificar.
        </li>
      </ul>
      <p>Respuesta:</p>
      <p>
        La respuesta contiene un objeto JSON con el mensaje "true" si el prestador es el dueño del trabajo, o "false" si no lo es.
      </p>
      <p>Ejemplo de solicitud:</p>
      <pre>
        <code>
          POST /es-mi-trabajo-prestador
          Content-Type: application/json
    
          {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRQcmVzdGFkb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q",
            "idTrabajo": 1
          }
        </code>
      </pre>
      <p>Ejemplo de respuesta:</p>
      <pre>
        <code>
          HTTP/1.1 200 OK
          Content-Type: application/json
    
          {
            "msg": true
          }
        </code>
      </pre>
    </li>
    <li>
      <code>PATCH /trabajo-estado/:idTrabajo</code> - Cambiar estado de trabajo
      <p>
        Descripción: Esta ruta permite cambiar el estado de un trabajo específico. Se requiere un token de autenticación válido, el ID del trabajo y el ID del nuevo estado para acceder a esta ruta. Solo el prestador o el consumidor asociado al trabajo pueden cambiar su estado.
      </p>
      <p>Parámetros de la URL:</p>
      <ul>
        <li>
          <code>idTrabajo</code> (number) - El ID del trabajo a actualizar.
        </li>
      </ul>
      <p>Cuerpo de la solicitud:</p>
      <ul>
        <li>
          <code>token</code> (string) - El token de autenticación del prestador o consumidor.
        </li>
        <li>
          <code>estadoId</code> (number) - El ID del nuevo estado del trabajo.
        </li>
      </ul>
      <p>Respuesta:</p>
      <p>
        La respuesta contiene un objeto JSON con el mensaje "Se actualizó el estado del trabajo" si se actualizó exitosamente, o un mensaje de error si ocurrió algún problema durante la actualización del estado.
      </p>
      <p>Ejemplo de solicitud:</p>
      <pre>
        <code>
          PATCH /trabajo-estado/1
          Content-Type: application/json
    
          {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRQcmVzdGFkb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q",
            "estadoId": 2
          }
        </code>
      </pre>
      <p>Ejemplo de respuesta:</p>
      <pre>
        <code>
          HTTP/1.1 200 OK
          Content-Type: application/json
    
          {
            "msg": "Se actualizó el estado del trabajo"
          }
        </code>
      </pre>
    </li>
    <li>
      <code>PATCH /trabajo-prestador-asignado/:idTrabajo</code> - Asignar prestador a trabajo
      <p>
        Descripción: Esta ruta permite asignar un prestador a un trabajo específico. Se requiere un token de autenticación válido, el ID del trabajo y el ID del prestador para acceder a esta ruta. Solo el consumidor asociado al trabajo puede asignar un prestador.
      </p>
      <p>Parámetros de la URL:</p>
      <ul>
        <li>
          <code>idTrabajo</code> (number) - El ID del trabajo a asignar.
        </li>
      </ul>
      <p>Cuerpo de la solicitud:</p>
      <ul>
        <li>
          <code>token</code> (string) - El token de autenticación del consumidor.
        </li>
        <li>
          <code>prestadorId</code> (number) - El ID del prestador a asignar al trabajo.
        </li>
      </ul>
      <p>Respuesta:</p>
      <p>
        La respuesta contiene un objeto JSON con el mensaje "Se asignó el prestador al trabajo" si se asignó exitosamente, o un mensaje de error si ocurrió algún problema durante la asignación del prestador.
      </p>
      <p>Ejemplo de solicitud:</p>
      <pre>
        <code>
          PATCH /trabajo-prestador-asignado/1
          Content-Type: application/json
    
          {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRQcmVzdGFkb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q",
            "prestadorId": 2
          }
        </code>
      </pre>
      <p>Ejemplo de respuesta:</p>
      <pre>
        <code>
          HTTP/1.1 200 OK
          Content-Type: application/json
    
          {
            "msg": "Se asignó el prestador al trabajo"
          }
        </code>
      </pre>
    </li>
    <li>
      <code>GET /prestador-id/:token</code> - Obtener id de prestador por token
      <p>
        Descripción: Esta ruta permite obtener el ID del prestador asociado a un token de autenticación válido.
      </p>
      <p>Parámetros de la URL:</p>
      <ul>
        <li>
          <code>token</code> (string) - El token de autenticación del prestador.
        </li>
      </ul>
      <p>Respuesta:</p>
      <p>
        La respuesta contiene el ID del prestador como un número entero si se encuentra, o un mensaje de error si ocurrió algún problema al obtener el ID del prestador.
      </p>
      <p>Ejemplo de solicitud:</p>
      <pre>
        <code>
          GET /prestador-id/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRQcmVzdGFkb3IiOjEsImlkUHJlc3RhcG9yIjozLCJpYXQiOjE2MzA1MzcwMzN9.6KbQJm3OP6L4h1Lj5L2sHsOQOxj7o0nO6mG2X7gsd5Q
        </code>
      </pre>
      <p>Ejemplo de respuesta:</p>
      <pre>
        <code>
          HTTP/1.1 200 OK
          Content-Type: application/json

    
          2
          
        </code>
      </pre>
    </li>
    <li>
      <code>GET /consumidor-id/:token</code> - Obtener id de consumidor por token
      <p>
        Descripción: Esta ruta permite obtener el ID del consumidor asociado a un token de autenticación válido.
      </p>
      <p>Parámetros de la URL:</p>
      <ul>
        <li>
          <code>token</code> (string) - El token de autenticación del consumidor.
        </li>
      </ul>
      <p>Respuesta:</p>
      <p>
        La respuesta contiene el ID del consumidor como un número entero si se encuentra, o un mensaje de error si ocurrió algún problema al obtener el ID del consumidor.
      </p>
      <p>Ejemplo de solicitud:</p>
      <pre>
        <code>
          GET /consumidor-id/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRDb25zdW1pY3JvciI6MSwiaWF0IjoxNjMwNTM3MDMzfQ.Zr-Z-6Kfj4z7r3Pv9V3XvUo3h6zK3sVQW2OQ1vNn8Gw
        </code>
      </pre>
      <p>Ejemplo de respuesta:</p>
      <pre>
        <code>
          HTTP/1.1 200 OK
          Content-Type: application/json
    
          1
        </code>
      </pre>
    </li>
    <li>
      <code>PATCH /trabajo-calificacion/:idTrabajo</code> - Calificar un trabajo
      <p>
        Descripción: Esta ruta permite calificar un trabajo realizado por un consumidor.
      </p>
      <p>Parámetros de la URL:</p>
      <ul>
        <li>
          <code>idTrabajo</code> (number) - El ID del trabajo a calificar.
        </li>
      </ul>
      <p>Cuerpo de la solicitud:</p>
      <ul>
        <li>
          <code>estrellas</code> (number) - La calificación en estrellas del trabajo (1-5).
        </li>
        <li>
          <code>token</code> (string) - El token de autenticación del consumidor.
        </li>
        <li>
          <code>comentario</code> (string) - El comentario del consumidor sobre el trabajo.
        </li>
      </ul>
      <p>Respuesta:</p>
      <p>
        La respuesta indica si la calificación se guardó correctamente o si ocurrió algún error.
      </p>
      <p>Ejemplo de solicitud:</p>
      <pre>
        <code>
          PATCH /trabajo-calificacion/123
          Content-Type: application/json
    
          {
            "estrellas": 4,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRDb25zdW1pY3JvciI6MSwiaWF0IjoxNjMwNTM3MDMzfQ.Zr-Z-6Kfj4z7r3Pv9V3XvUo3h6zK3sVQW2OQ1vNn8Gw",
            "comentario": "Buen trabajo realizado"
          }
        </code>
      </pre>
      <p>Ejemplo de respuesta exitosa:</p>
      <pre>
        <code>
          HTTP/1.1 200 OK
          Content-Type: application/json
    
          {
            "msg": "Calificación guardada"
          }
        </code>
      </pre>
      <p>Ejemplo de respuesta de error:</p>
      <pre>
        <code>
          HTTP/1.1 500 Internal Server Error
          Content-Type: application/json
    
          {
            "msg": "Error interno del servidor: Mensaje de error"
          }
        </code>
      </pre>
    </li>
          
</ul>
</html>
`;


export default WorkController;