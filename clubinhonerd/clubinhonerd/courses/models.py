from django.db import models


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
	create_at = models.DateTimeField('Criado em', auto_now_add=True)
	updated_at = models.DateTimeField('Atualizado em', auto_now=True)

	objects = CourseManager() # um método que eu criei / adicionando ele no objects

	# retornar o nome do curso
	def __str__(self):
		return self.name

	# é bom criar ele quando um model tiver uma página so pra ele
	@models.permalink	
	def get_absolute_url(self):
		#              url      url nomeada
		return ('details', (), { 'slug': self.slug })	

	#  nomes dos campos lá no admin
	class Meta:
		verbose_name = 'Curso'
		verbose_name_plural = 'Cursos'
		ordering = ['name']	


# ________________BD_____________________

# object é um Manager
# Course.object.all() = retorna tudo / ".all" = é um atalho
# Course.object.filter(name='', age=''...) = filtrando com AND
# Course.object.filter(name__icontains='Python') = ver se o nome contem tal nome
# Course.object.filter(name__iexact='MAIUSCULO') = ver se o nome contem tal nome
# Course.delete() = deleta todos
# Course.create(...) = inserir



