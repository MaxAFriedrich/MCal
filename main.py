from http.server import HTTPServer, BaseHTTPRequestHandler
ip="192.168.1.13"
class Serv(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        if self.path == '/':
            self.path = '/index.html'
        try:
            file_to_open = open(self.path[1:]).read()
            self.send_response(200)
        except:
            file_to_open = "File not found"
            self.send_response(404)
        self.end_headers()
        self.wfile.write(bytes(file_to_open, 'utf-8'))

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        strBody = str(body).replace("b'","")
        strBody=strBody.replace("'","")
        strBody=strBody.replace(",undefined:","")
        file=open("MCal.dat","w")
        file.write(strBody)
        file.close
        self.send_response(200)
        self.end_headers()
        self.wfile.write(bytes("index.html", 'utf-8'))


httpd = HTTPServer(("localhost", 80), Serv)
httpd.serve_forever()