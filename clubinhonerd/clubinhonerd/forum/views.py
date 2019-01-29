from django.shortcuts import render, redirect
from django.views.generic import TemplateView, ListView, DetailView
from django.contrib import messages

from .models import Thread
from .forms import ReplyForm

"""
# Usando a View
class ForumView(View):

	# template_name = 'forum/index.html'
	def get(self, request, *args, **kwargs):
		return render(request, 'forum/index.html')


Usando uma GenericView
class ForumView(TemplateView):

	template_name = 'forum/index.html'


index = TemplateView.as_view(template_name='forum/index.html')
"""
class ForumView(ListView):
	
	"""
	Podemos idicar tanto o 'model' = model = Thread
	Como também podemos indicar a 'queryset' = função abaixo
	Número de 'objetos' por página(a cada x objetos cria-se uma nova)
	"""
	paginate_by = 5
	template_name = 'forum/index.html'

	# Indicando a QueryString/QuerySet
	def get_queryset(self):
		# Indicando o model
		queryset = Thread.objects.all()
		# Pegando o que está na QueryString
		order = self.request.GET.get('order', None) # None ou ''
		if order == 'views':
			queryset = queryset.order_by('-views')
		elif order == 'answers':
			queryset = queryset.order_by('-answers')
		# Acessando um atributo nomeado da url
		tag = self.kwargs.get('tag', None) # None ou ''
		if tag:
			queryset = queryset.filter(tags__slug__icontains=tag)

		return queryset

	"""
	'**kwargs' = argumentos que são passados na url (nomeados)
	'*args' = argumentos que são passados na url (não nomeados)
	Para atualizar/adicionar o context
	"""
	def get_context_data(self, **kwargs):
		context = super(ForumView, self).get_context_data(**kwargs)
		context['tags'] = Thread.tags.all()
		return context

"""
DetailView busca o objeto pelo slug ou pk
Detalhar uma Thread
DetailView implementa apenas o método get
"""
class ThreadView(DetailView):

	model = Thread
	template_name = 'forum/thread.html'

	def get_context_data(self, **kwargs):
		context = super(ThreadView, self).get_context_data(**kwargs)
		context['tags'] = Thread.tags.all()
		context['form'] = ReplyForm(self.request.POST or None)
		return context

	# Para submissão de um formulário
	def post(self, request, *args, **kwargs):
		# Verificando se o usuário está 'logado'
		if not self.request.user.is_authenticated: 
			messages.error(request, 'Para responder ao tópico é necessário estar logado')
			# redirecionando para a mesma página, porém para o get
			return redirect(self.request.path)
		self.object = self.get_object()
		context = self.get_context_data(object=self.object)
		form = context['form']
		if form.is_valid():
			# apenas preenchendo com os dados, sem salva-los
			reply = form.save(commit=False)
			reply.thread = self.object
			reply.author = self.request.user
			reply.save()
			messages.success(request, 'A sua resposta foi envianda com sucesso.')
			# Limpando o formulário
			context['form'] = ReplyForm()
		return self.render_to_response(context)

# as_view retorna uma função
index = ForumView.as_view()
thread = ThreadView.as_view()



