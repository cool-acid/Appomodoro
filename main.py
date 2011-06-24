#!/usr/bin/env python
import os
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

class MainPage(webapp.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), 'index.html')
        valores = {
            'preferencias':{
                'largopom': 25,
                'descorto':5,
                'deslargo':20
            }
        }
        self.response.out.write(template.render(path, None))
application = webapp.WSGIApplication([
    ('/', MainPage)
    ], debug=True)

def main():
  run_wsgi_app(application)

if __name__ == '__main__':
  main()