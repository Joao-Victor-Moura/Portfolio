from flask import Flask, render_template, redirect, request, flash
from flask_mail import  Mail, Message
from config import email, senha

app = Flask (__name__)
app.secret_key = 'joaoprudencio' # senha para criptograr algumas transições externas do flask

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": email,
    "MAIL_PASSWORD": senha
} 

app.config.update(mail_settings)
mail = Mail(app)

class Contato:
    def __init__(self, nome, email, mensagem):
        self.nome = nome
        self.email = email
        self.mensagem = mensagem

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send', methods=['GET', 'POST'])
def send():
    if request.method  ==  'POST':  
        formContato = Contato(                           #Pega o nome, email e mensagem do form e coloca dentro do objeto formContato
            request.form["nome"],
            request.form["email"],
            request.form["mensagem"]
        )

        msg = Message(                                                                  #Preenchendo a mensagem usando os dados do formContato
            subject = f'{formContato.nome} enviou uma mensagem pelo portfólio',
            sender = app.config.get("MAIL_USERNAME"),
            recipients = ['joaoprudencio98@gmail.com', app.config.get("MAIL_USERNAME")],
            body = f'''

            {formContato.nome} ({formContato.email}) enviou a seguinte mensagem no portfólio:

            {formContato.mensagem}

            '''
        )
        mail.send(msg)  #Enviando a mensagem
        flash('Mensagem enviada com sucesso!')
    return redirect('/') #voltando pra rota do index

if __name__ == '__main__':
    app.run(debug=True)