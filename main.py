#!/usr/bin/env python
import os
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

class MainPage(webapp.RequestHandler):
    def get(self):
        #por lo mientras solo vamos a mostrar la pagina tal cual. Sin pre-processing.
        path = os.path.join(os.path.dirname(__file__), 'pruebacanvas.html')
        self.response.out.write(template.render(path, None))

application = webapp.WSGIApplication([
    ('/', MainPage)
    ], debug=True)

def main():
  run_wsgi_app(application)

if __name__ == '__main__':
  main()