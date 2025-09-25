import http.server
import socketserver

PORT = 8888

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Servidor rodando em http://localhost:{PORT}")
    print("Use este endereço no seu navegador para ver o site.")
    print("Para encerrar o servidor, pressione Ctrl+C no terminal.")
    httpd.serve_forever()
