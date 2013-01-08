from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db

import jinja2
import os

template_dir = "htmltemplates"
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
                               autoescape = True)

def render_str(template, **params):
    t = jinja_env.get_template(template)
    return t.render(params)


class RequestHandler(webapp.RequestHandler):
    """
    Parent class for all other webpages.
    """    
    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        return render_str(template, **params)

    def render(self, template, **kw):
        self.write(self.render_str(template, **kw))

class MainPage(RequestHandler):

    def get(self):
        self.render('home.html')
        

class PlaneHandler(RequestHandler):

    def get(self):
        self.render('seatmap.html')

    def post(self):
        self.write(self.request.get)

application = webapp.WSGIApplication([('/',MainPage),
                                      ('/seatmap.*',PlaneHandler)
                                      ],debug=True)


def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
