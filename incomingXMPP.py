from google.appengine.api import xmpp
from google.appengine.ext import webapp
#from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

class Incoming(webapp.RequestHandler):
    def post(self):
        mensaje = xmpp.Message(self.request.POST)
        if (mensaje.body[:7].lower() == 'iniciar'):
            mensaje.reply('iniciando')
        elif (mensaje.body[:5].lower() == 'start'):
            mensaje.reply('starting')
        else:
            mensaje.reply('I didn\'t get what you\'re trying to say. Try again!')
        
application = webapp.WSGIApplication([
    ('/_ah/xmpp/message/chat/', Incoming)
    ], debug=True)

def main():
  run_wsgi_app(application)

if __name__ == '__main__':  
  main()