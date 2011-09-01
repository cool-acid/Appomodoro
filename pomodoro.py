# -*- coding: utf-8 -*-
from google.appengine.api import taskqueue
from google.appengine.api import xmpp
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
import logging

__fin__ = u'Se acab贸 tu pomodoro de %s minutos! Ahora t贸mate %s minutos de descanso, te lo mereces.'
__end__ = u'Your %s minutes pomodoro is over! Now take a %s minute break, you deserve it.'

__findescanso__ = u'Se acabo tu descanso de %s minutos! Listo para empezar otro pomodoro?'
__endrest__ = u'Your %s minutes break is over! Ready to start a new pomodoro?'

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
            else:
                segundos = int(self.request.get('descanso'))*60
                taskqueue.add(url='/descanso', params={'local':self.request.get('local'), 'pomodoro': self.request.get('pomodoro'), 'descanso':self.request.get('descanso'), 'sender':self.request.get('sender')}, countdown=segundos)
class Descanso (webapp.RequestHandler):
    def post(self):
        #enviamos mensaje
        mensaje = __findescanso__ if self.request.get('local') == 'es' else __endrest__
        result = xmpp.send_message(self.request.get('sender'), "HEY!")
        if result != xmpp.NO_ERROR:
            logging.error("No se pudo enviar el mensaje a %s"%self.request.get('sender'))
        else:
            result = xmpp.send_message(self.request.get('sender'), mensaje % (self.request.get('descanso')))
            if result != xmpp.NO_ERROR:
                logging.error("No se pudo enviar el mensaje a %s"%self.request.get('sender'))

application = webapp.WSGIApplication([
    ('/pomodoro', Pomodoro),
    ('/descanso', Descanso)
    ], debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()