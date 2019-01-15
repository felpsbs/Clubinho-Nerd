from django.db import models
from django.conf import settings
from django.utils import timezone

from clubinhonerd.core.mail import send_mail_templates

# para fazer consultadas no BD
# Manager customizado
class CourseManager(models.Manager):

	def search(self, query):
		# lista de models do BD com 'AND'
		# return self.get_queryset().filter(name__icontains=query, description__icontains=query)
		# lista de models do BD com 'OR'
		return self.get_queryset().filter(models.Q(name__icontains=query) | models.Q(description__icontains=query)) 
		

# chave primaria = primary_key = True
# Uma representação da tabela do BD
class Course(models.Model):

	name = models.CharField('Nome', max_length=100)
	slug = models.SlugField('Atalho')
	description = models.TextField('Descrição', blank=True)
	about = models.TextField('Sobre o Curso', blank=True)
	start_date = models.DateField('Data de Início', null=True, blank=True)
	# concatenado com o diretorio criado no settings / path
	image = models.ImageField(upload_to='courses/images', verbose_name='Imagem', null=True, blank=True) 
	created_at = models.DateTimeField('Criado em', auto_now_add=True)
	updated_at = models.DateTimeField('Atualizado em', auto_now=True)

	objects = CourseManager() # um método que eu criei / adicionando ele no objects

	# retornar o nome do curso
	def __str__(self):
		return self.name

	# é bom criar ele quando um model tiver uma página só pra ele / para a url no barra de pesquisa
	@models.permalink	
	def get_absolute_url(self):
		#              url      url nomeada
		return ('details', (), { 'slug': self.slug })	


	def release_lessons(self):
		today = timezone.now().date()
		# gte = greater than
		return self.lessons.filter(release_date__gte=today)

	#  nomes dos campos lá na página do admin
	class Meta:
		verbose_name = 'Curso'
		verbose_name_plural = 'Cursos'
		ordering = ['name']	


# Modelo da aula em si, não armazenando conteúdo
class Lesson(models.Model):

	name = models.CharField('Nome', max_length=100)
	description = models.TextField('Descrição', blank=True)
	# para ordenar as aulas
	number = models.IntegerField('Número(ordem)', blank=True, default=0)
	release_date = models.DateField('Data de liberação', blank=True, null=True)

	# Relacionando com um curso
	course = models.ForeignKey(Course, 
		verbose_name='Curso', related_name='lessons', on_delete=models.PROTECT
	)
	created_at = models.DateTimeField('Criado em', auto_now_add=True)
	updated_at = models.DateTimeField('Atualizado em', auto_now=True)
	
	def __str__(self):
		return self.name

	# verificar se a aula está liberada
	def is_available(self):
		if self.release_date:
			today = timezone.now().date()
			return self.release_date >= today
		return False


	class Meta():
		verbose_name = 'Aula'
		verbose_name_plural = 'Aulas'
		ordering = ['number']


# Materiais da aula
class Material(models.Model):
	
	name = models.CharField('Nome', max_length=100)
	# para conteúdo multimídia
	embedded = models.TextField('Vídeo Embedded', blank=True)
	# Por enquanto será público
	file = models.FileField(upload_to='lessons/materials', blank=True)

	# Conectando com uma Lesson
	lesson = models.ForeignKey(Lesson,
		verbose_name='Aula', related_name='materials', on_delete=models.PROTECT
	)

	def is_embedded(self):
		return bool(self.embedded)

	def __str__(self):
		return self.name

	class Meta():

		verbose_name = 'Material'
		verbose_name_plural = 'Materiais'



# Inscrição de um user em um curso
class Enrollment(models.Model):
	# related_name = essa classe passa a ter um atributo que irá conter tudo nele
		# ex: todas as inscrições 	

	STATUS_CHOICES = (
		(0, 'Pendente'),
		(1, 'Aprovado'),
		(2, 'Cancelado'),
	)

	user = models.ForeignKey(settings.AUTH_USER_MODEL,
		verbose_name='Usuário', related_name='enrollments', on_delete=models.PROTECT
	)
	course = models.ForeignKey(Course, 
		verbose_name='Course',related_name='enrollments', on_delete=models.PROTECT
	)
	# Status da inscrição
	status = models.IntegerField('Situação', choices=STATUS_CHOICES, default=0, blank=True)
	created_at = models.DateTimeField('Criado em', auto_now_add=True)
	updated_at = models.DateTimeField('Atualizado em', auto_now=True)

	# ativar status do aluno
	def active(self):
		self.status = 1
		self.save()

	# Verificando se a inscrição foi aprovada
	def is_approved(self):
		return self.status == 1


	class Meta:
		verbose_name = 'Inscrição'
		verbose_name_plural = 'Inscrições'
		# para evitar repetições no BD
		unique_together = (('user', 'course'),)


class Announcement(models.Model):
	
	course = models.ForeignKey(Course,
		verbose_name='Curso', related_name='announcements',on_delete=models.PROTECT
	)
	title = models.CharField('Título', max_length=100)
	content = models.TextField('Conteúdo')
	created_at = models.DateTimeField('Criado em', auto_now_add=True)
	updated_at = models.DateTimeField('Atualizado em', auto_now=True)

	def __str__(self):
		return self.title

	class Meta():
		verbose_name = 'Anúncio'
		verbose_name_plural = 'Anúncios'
		# ordenado de forma decrescente
		ordering = ['-created_at']


class Comment(models.Model):
	
	announcement = models.ForeignKey(Announcement, 
		verbose_name='Anúncio',related_name='comments', on_delete=models.PROTECT
	)
	user = models.ForeignKey(settings.AUTH_USER_MODEL,
		verbose_name='Usuário', on_delete=models.PROTECT
	)
	comment = models.TextField('Comentário')
	created_at = models.DateTimeField('Criado em', auto_now_add=True)
	updated_at = models.DateTimeField('Atualizado em', auto_now=True)

	class Meta():
		verbose_name = 'Comentário'
		verbose_name_plural = 'Comentários'
		# ordenado de forma crescente
		ordering = ['created_at']
		

# **kwargs = outros argumentos
# Função que será disparada quando o catilhos post_save for ativado
def post_save_announcement(instance, created,**kwargs):
	if created:
		subject = instance.title
		context = {
			'announcement': instance,
		}
		template_name = 'courses/announcement_mail.html'
		enrollments = Enrollment.objects.filter(course=instance.course, status=1)
		for enrollment in enrollments:
			recipient_list = [enrollment.user.email]
			send_mail_templates(subject, template_name, context, recipient_list)

# indicando a função acima e a relacionando com o catilho post_save
# sender = quem irá envia-lo
# para saber se essa função já foi cadastrada, é um identificador
models.signals.post_save.connect(post_save_announcement, sender=Announcement, dispatch_uid='post_save_announcement')


# ________________BD_____________________

# object é um Manager
# Course.object.all() = retorna tudo / ".all" = é um atalho
# Course.object.filter(name='', age=''...) = filtrando com AND
# Course.object.filter(name__icontains='Python') = ver se o nome contem tal nome
# Course.object.filter(name__iexact='MAIUSCULO') = ver se o nome contem tal nome
# Course.delete() = deleta todos
# Course.create(...) - inserir