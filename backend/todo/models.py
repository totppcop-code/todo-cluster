from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_done = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.title}-{self.content}'
