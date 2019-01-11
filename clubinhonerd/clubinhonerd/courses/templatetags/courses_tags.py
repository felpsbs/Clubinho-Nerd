# Modulo que pode ser utilizado em todo código(cursos do usuário)
from django import template
# Para registrar as tags criadas
register = template.Library()

from clubinhonerd.courses.models import Enrollment

# Transformando a função em uma tag | nome do template onde a tag será usada
@register.inclusion_tag('courses/templatetags/my_courses.html')
def my_courses(user):
	# pegando as inscrições do usuário
	enrollments = Enrollment.objects.filter(user=user)
	context = {
		'enrollments': enrollments
	}

	return context


# Função que irá atualizar o context
@register.simple_tag
def load_my_courses(user):
	return Enrollment.objects.filter(user=user)



# inclusion_tag = usado quando o html for fixo e complexo
# simple_tag = é mais flexível, quando o html sofrer variações