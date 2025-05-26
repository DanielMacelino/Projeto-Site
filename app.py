from flask import Flask, render_template, request, redirect, url_for, flash
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'sua_chave_secreta_aqui')  # Usa variável de ambiente na Vercel


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/experiencia')
def experiencia():
    return render_template('experiencia.html')


@app.route('/contato')
def contato():
    return render_template('contato.html')


@app.route('/habilidades')
def habilidades():
    return render_template('habilidades.html')


@app.route('/enviar-mensagem', methods=['POST'])
def enviar_mensagem():
    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        assunto = request.form['assunto']
        mensagem = request.form['mensagem']
        
        # Aqui você pode adicionar a lógica para enviar o email
        # Por exemplo, usando Flask-Mail ou outro serviço de email
        
        flash('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success')
        return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
