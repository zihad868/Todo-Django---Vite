from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('todo', views.TodoViewSet, basename='todo')
urlpatterns = router.urls