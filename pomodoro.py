# -*- coding: utf-8 -*-
from google.appengine.api import taskqueue
from google.appengine.api import xmpp
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
import logging

__fin__ = u'Se acabó tu pomodoro de %s minutos! Ahora tómate %s minutos de descanso, te lo mereces.'
__end__ = u'Your %s minutes pomodoro is over! Now take a %s minute break. You deserve it.'

class Pomodoro (webapp.RequestHandler):
    def post(self):
        #enviamos mensaje
        mensaje = __fin__ if self.request.get('local') == 'es' else __end__
        result = xmpp.send_message(self.request.get('sender'), "HEY!")
        if result != xmpp.NO_ERROR:
            logging.error("No se pudo enviar el mensaje a %s"%self.request.get('sender'))
        else:
            result = xmpp.send_message(self.request.get('sender'), mensaje % (self.request.get('pomodoro'), self.request.get('descanso')))
            if result != xmpp.NO_ERROR:
                logging.error("No se pudo enviar el mensaje a %s"%self.request.get('sender'))
        #TODO: Programar la task del descanso, agregar /descanso como otra funcion de aqui    

application = webapp.WSGIApplication([
    ('/pomodoro', Pomodoro)
    ], debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
