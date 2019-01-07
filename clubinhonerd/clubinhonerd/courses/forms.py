from django import forms
from django.core.mail import send_mail
from django.conf import settings
from clubinhonerd.core.mail import send_mail_templates

class ContactCourse(forms.Form):

	name = forms.CharField(label='Nome', max_length=100)
	email = forms.EmailField(label='Email')
	message = forms.CharField(label='Mensagem/Dúvida', widget=forms.Textarea)

	def send_mail(self, course):
		subject = '[%s] Contato' % course
		# forma nomeada de formatar strings
		# message = 'Nome: %(name)s; E-mail: %(email)s; Message%(message)s'
		context = {
			# cleaned_data = dicionário de dados(json) já validados(int,float) para conversão
			'name': self.cleaned_data['name'],
			'email': self.cleaned_data['email'],
			'message': self.cleaned_data['message'],
		}
		template_name = 'courses/contact_email.html'
		send_mail_templates(
			subject, 
			template_name, 
			context,
			[settings.CONTACT_EMAIL]
		)


		# send_mail(
		#     'Subject here',
		#     'Here is the message.',
		#     'from@example.com',
		#     ['to@example.com'],
		#     fail_silently=False,
		# )
