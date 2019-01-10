import re
from django.db import models
from django.core import validators
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.conf import settings

class User(AbstractBaseUser, PermissionsMixin):

	username = models.CharField(
		'Nome de Usuário', max_length=30, unique=True,
		validators=[validators.RegexValidator(re.compile('^[\w.@+-]+$'), 
			'Nome de usuário só pode conter letras, digitos ou os seguintes caracteres: @/./+/-/_',
			'invalid'
		)]
	)
	email = models.EmailField('E-mail', unique=True)
	name = models.CharField('Nome', max_length=100, blank=True)
	# para funcionamento do sistema de admin 
	is_active = models.BooleanField('Está ativo?', blank=True, default=True)
	# Para o django admin saber se esse usuário pode acessar o admin
	is_staff = models.BooleanField('É da equipe?', blank=True, default=False)
	date_joined = models.DateTimeField('Data de entrada', auto_now_add=True)

	objects = UserManager()

	# Abaixo são para bom funcionamento do admin	

	# referência na hora do login
	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = ['email']

	# Para retornar o nome do Usuário
	def __str__(self):
		return self.name or self.username

	def get_short_name(self):
		return self.username

	def get_full_name(self):
		return str(self)

	class Meta:
		verbose_name = 'Usuário'
		verbose_name_plural = 'Usuários'



class PasswordReset(models.Model):

	# Aqui é o usuário que solicitou a nova senha
	# No django a relação 1:n, a relação fica no "n"
	user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Usuário', 
		related_name='resets', on_delete=models.PROTECT
	)
	key = models.CharField('Chave', max_length=100, unique=True)
	created_at = models.DateTimeField('Criado em', auto_now_add=True)
	confirmed = models.BooleanField('Confirmado?', default=False, blank=True)

	def __str__(self):
		return '{0} em {1}'.format(self.user, self.created_at)


	class Meta(object):
		verbose_name = 'Nova Senha'
		verbose_name_plural = 'Novas senhas'
		# em ordem decrescente/ atributo da classe meta
		ordering = ['-created_at']
