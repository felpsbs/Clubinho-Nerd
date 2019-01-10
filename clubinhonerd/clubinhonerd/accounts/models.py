import re
from django.db import models
from django.core import validators
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager


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







