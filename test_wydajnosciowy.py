from locust import HttpUser, TaskSet, task, between

class MyUser(HttpUser):
    wait_time = between(1, 3)  # Określ interwał czasowy między żądaniami

    # Definiuj zadania (tasks) dla użytkownika
    @task
    def my_task(self):
        self.client.get("/index.html")  # Wykonaj żądanie GET na odpowiednim endpointzie

