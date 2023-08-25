Backend:


Backend is done with the help of Python Flask and Database i used is MongoDB   /n

Routes:  /n

(1) Login: http://127.0.0.1:5002/login     /n
    Method: POST/n
    Body example:/n     
                  {/n
                      "email":"a@gmail.com",/n
                      "password":"a123"/n
                  }/n
(2) Register: http://127.0.0.1:5002/register
    Method: POST
    Body example:      
                  {
                      "name":"a"
                      "email":"a@gmail.com",
                      "password":"a123"
                  }
(3) Generate Response: http://127.0.0.1:5002/generate-message
    Method: POST
    Body example:      
                  {
                    "prompt": "Tell me how to learn helicopter"
                  }
