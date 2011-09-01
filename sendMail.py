# -*- coding: utf-8 -*-

from google.appengine.api import mail
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

class Sendmail(webapp.RequestHandler):
    def post(self):
        if self.request.get('nombre')\
        and self.request.get('correo')\
        and self.request.get('mensaje'):
            if self.validateEmail(self.request.get('correo')):
                subject = "coolacid.mx - Contacto"
                message1 = '''
                <html>
                    <body style=\"color:#333;font-family: Tahoma, 'Helvetica Neue', Arial, 'Liberation Sans', FreeSans, sans-serif;font-size:15px;\">
                        <div><h1 style=\"color:#9C002E;font-size:20px;\">Contacto.</h1></div>
                        <h2 style=\"color:#000000;font-size:17px;\">Hola Cool Acid!</h2>
                        
                '''
                message1_5 = "<p>Una persona llamada <b>%s</b> te quiere contactar y dice:</p><p>%s</p>"%(self.request.get('nombre'),self.request.get('mensaje'))
                if self.request.get('website'):
                    message2 = '        <p>Su website actual es <a href="%s">%s</a></p>'%(self.request.get('website'),self.request.get('website'))
                else:
                    message2 = ''
                message2_5 = '<p>Y su correo es <a href="mailto:%s">%s</a></p>'%(self.request.get('correo'),self.request.get('correo'))
                message3 = '''
                        
                        <p><b>KTHXBYE</b></p>
                    </body>
                </html>
                '''
                messagefinal = message1 + message1_5 + message2 + message2_5 + message3
                mail.send_mail(
                    sender = 'Cool Acid <coolacid217@gmail.com>',
                    to = 'coolacid217@gmail.com',
                    subject = subject,
                    body = messagefinal,
                    html = messagefinal
                )
                self.response.out.write("OK\n")
#                self.response.out.write(messagefinal)
            else:
                self.response.out.write("ERROR: mail invalido\n")
        else:
            self.response.out.write("ERROR: faltan campos requeridos\n")

    def validateEmail(self, email):
        if len(email) > 7:
            import re
            if re.match("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$", email) != None:
                return 1
        return 0


application = webapp.WSGIApplication([
    ('/sendmail', Sendmail)
    ], debug=True)

def main():
  run_wsgi_app(application)

if __name__ == '__main__':  
  main()