# Proyecto_Final_Tecnicas_Modernas_Automatizacion

Para correr el proyecto y sus pruebas, sera necesario haber clonado o descargado la aplicacion cypress-realworld-app, asi como en el shell instalar 
con el comando "yarn install" y correr la aplicacion con el comando "yarn dev" para levantar la aplicacion.

Tambien contar con node instalado.

Para ejecutar las pruebas:

Usar el comando "./node_modules/bin/cypress open" o "cy:open" en la terminal para abrir el Cypress Test Runner y ejecutar las pruebas localmente.

Ejecutar prueba #1: Crear usuario

Para que dichas pruebas corran exitosamente, se debe tener configurado un archivo "cypress.env.json" en la raiz del proyecto donde se pueda incluir 
las siguientes 2 variables de entorno y su valor a tener al momento de ejecutarla las pruebas y que funcionen correctamente:

  "clairUser": "VALOR1",
  "clairPassword": "VALOR2",

Para algunas de las siguientes lineas dentro de las pruebas:
  username:  Cypress.env('ClairUser'),
  password:  Cypress.env('ClairPassword'),
  confirmPassword: Cypress.env('ClairPassword')
  
Las pruebas de crear usuario se encuentran alojadas en el archivo "signup-spec.js" dentro del folder "registration" para ser ejecutado en el Cypress Test Runner.


Ejecutar prueba #2: Loguear usuario

Para que dichas pruebas corran exitosamente, se debe tener configurado un archivo "cypress.env.json" en la raiz del proyecto donde se pueda incluir 
las siguientes 2 variables de entorno y su valor a tener al momento de ejecutarla las pruebas y que funcionen correctamente:

  "clairUser": "VALOR1",
  "clairPassword": "VALOR2",

Para algunas de las siguientes lineas dentro de las pruebas:
  username: Cypress.env('clairUser'),
  password: Cypress.env('clairPassword'),
  
Las pruebas de loguear usuario se encuentran alojadas en el archivo "login-spec.js" dentro del folder "authentication" para ser ejecutado en el Cypress Test Runner.


Ejecutar prueba #3: Crear cuenta bancaria y borrar cuenta bancaria

Para que dichas pruebas corran exitosamente, se debe tener configurado un archivo "cypress.env.json" en la raiz del proyecto donde se pueda incluir 
las siguientes 5 variables de entorno y su valor a tener al momento de ejecutarla las pruebas y que funcionen correctamente:

  "clairUser": "VALOR1",
  "clairPassword": "VALOR2",
  "clairBankName": "VALOR3",
  "clairRoutingNumber": "VALOR4",
  "clairAccountNumber": "VALOR5",

Para algunas de las siguientes lineas dentro de las pruebas:
  username: Cypress.env('clairUser'),
  password: Cypress.env('clairPassword'),
  bankName: Cypress.env('clairBankName'),
  routingNumber: Cypress.env('clairRoutingNumber'),
  accountNumber: Cypress.env('clairAccountNumber'),
  
El scope de dicha prueba es para cuando un usuario ya cuenta con una cuenta. Si el usuario es nuevo (que es lo probable al usar el mismo usuario con el que se creo
en pruebas anteriores) se tendra que configurar manualmente una cuenta (antes de correr esta prueba), para evadir el chequeo de primeros pasos en la aplicacion
para esta prueba (de lo contrario fallara).
  
Las pruebas de crear cuenta y elimnar cuenta se encuentran alojadas en el archivo "bank-accounts-spec.js" dentro del folder "bank-accounts" para ser ejecutado en
el Cypress Test Runner.


Ejecutar prueba #4: Crear transacciones request y pay

Para que dichas pruebas corran exitosamente, se debe tener configurado un archivo "cypress.env.json" en la raiz del proyecto donde se pueda incluir 
las siguientes 5 variables de entorno y su valor a tener al momento de ejecutarla las pruebas y que funcionen correctamente:

  "clairUser": "VALOR1",
  "clairPassword": "VALOR2",
  "clairTransAmount": "VALOR3",
  "clairTransNote": "VALOR4",
  "edgarUser": "VALOR5", //este valor debe ser el username del usuario

Para algunas de las siguientes lineas dentro de las pruebas:
  username: Cypress.env('clairUser'),
  password: Cypress.env('clairPassword'),
  amount: Cypress.env('clairTransAmount'),
  note: Cypress.env('clairTransNote'),
  transactionContactsPage.ClickUser(Cypress.env('edgarUser'));
  
La prueba se corre contemplando que dentro de la lista de contactos, existe 'edgarUser' para que asi, al loguearse con el usuario indicado, encuentre a dicho 'edgarUser'
y pueda empezar la prueba.
  
Las pruebas de crear transacciones request y pay se encuentran alojadas en el archivo "transactions-spec.js" dentro del folder "transactions" para ser ejecutado en
el Cypress Test Runner.


Ejecutar prueba #5: Listar transacciones, crear comentarios y dar like

Para que dichas pruebas corran exitosamente, se debe tener configurado un archivo "cypress.env.json" en la raiz del proyecto donde se pueda incluir 
las siguientes 3 variables de entorno y su valor a tener al momento de ejecutarla las pruebas y que funcionen correctamente:

  "clairUser": "VALOR1",
  "clairPassword": "VALOR2",
  "transactionId": "8YnLpItFazLO" //debe ser el id de una transaccion que este listada para el usuario en cuestion. Verificar antes.

Para algunas de las siguientes lineas dentro de las pruebas:
  username: Cypress.env('clairUser'),
  password: Cypress.env('clairPassword'),
  .get('[data-test="transaction-item-'+Cypress.env('transactionId')+'"]')
  
La prueba se corre contemplando que dicho usuario podra ver al menos 1 transaccion en el homepage al loguearse con el usuario indicado y pueda empezar la prueba.
Para la prueba exitosa de dar like, se hace contemplando inicialmente -y de hecho se verifica- que el usuario no haya dado like a la transaccion.
  
Las pruebas de crear listar, crear comentarios y dar like se encuentran alojadas en el archivo "transaction-details-spec.js" dentro del folder "transactions" 
para ser ejecutado en el Cypress Test Runner.
