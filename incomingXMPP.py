# -*- coding: utf-8 -*-
import re, logging
from google.appengine.api import xmpp
from google.appengine.ext import webapp
#from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app


__saludo__ = 'Hola! Voy a iniciar un pomodoro de %i minutos y después un descanso de %i minutos.'
__greeting__ = 'Hello! I\'m starting a %i minutes pomodoro with a %i minutes break after that.'

class Incoming(webapp.RequestHandler):
    def post(self):
        pomodoro = 25
        descanso = 5

        mensaje = xmpp.Message(self.request.POST)
        expresion = '((?:[a-z][a-z]+))([\s\d]+)*'
        cexpresion = re.compile(expresion, re.IGNORECASE|re.DOTALL)
        dos = '(\d+)\s*(\d+)*'
        cdos = re.compile(dos)
        m=cexpresion.match(mensaje.body)
        if m:
            logging.info(m.groups())
            if m.group(1):
                logging.info('comando: %s' % m.group(1))
                comando = m.group(1)
                if comando.lower() == 'iniciar' or comando.lower() == 'start':
                    hiHola = __saludo__ if comando.lower() == 'iniciar' else __greeting__ #Saludo localizado
                    if m.group(2): #Osea que hay argumentos...
                        argumentos = m.group(2).strip()
                        logging.info(argumentos)
                        n = cdos.match(argumentos)
                        if n:
                            logging.info(n.groups())
                            if n.group(1):
                                arg1 = int(n.group(1))
                                pomodoro = arg1 if (arg1 > 0 and arg1 < 100) else pomodoro
                                if n.group(2):
                                    arg2 = int(n.group(2))
                                    descanso = arg2 if (arg2 > 0 and arg2 < 100) else descanso
                    mensaje.reply(hiHola%(pomodoro,descanso))
                else:
                    mensaje.reply('I didn\'t get what you\'re trying to say. Try again!')                    
            else:
                mensaje.reply('I didn\'t get what you\'re trying to say. Try again!')                    
        else:
            mensaje.reply('I didn\'t get what you\'re trying to say. Try again!')                    

application = webapp.WSGIApplication([
    ('/_ah/xmpp/message/chat/', Incoming)
    ], debug=True)

def main():
  run_wsgi_app(application)

if __name__ == '__main__':  
  main()