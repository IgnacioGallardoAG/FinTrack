from locust import HttpUser, between, task

# TOKEN REAL del frontend
# Pegas aquí un access_token que saques desde Keycloak al iniciar sesión en tu app
TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ4NE5zSS05MTc4SnVWX2FuZGZscW8zOUhiMjA1aS16NVRuQ0I3RUNHek9NIn0.eyJleHAiOjE3NjQwNTI2MzEsImlhdCI6MTc2NDA1MjMzMSwiYXV0aF90aW1lIjoxNzY0MDUyMzMxLCJqdGkiOiJhZWMxODk3OC01MWVhLTRlNTItYTU5Zi0zYWU3YTM5ZjEyZjIiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL2ZpbnRyYWNrIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjAyOTBmZTVlLTNiZTEtNDIzNS04ZjlkLWVjZjFjOWM5MWQ0ZiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZyb250ZW5kLWNsaWVudCIsIm5vbmNlIjoiZjEzNDRkZDMtMDI3Ni00ZjIyLWFjOGItZDcyNGI3NzllMjgzIiwic2Vzc2lvbl9zdGF0ZSI6Ijc5NWI3MzdiLWUyZjEtNDk5Ni04NGQ0LTczYjY1MmUyNzc2OCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo1MTczIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWZpbnRyYWNrIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiI3OTViNzM3Yi1lMmYxLTQ5OTYtODRkNC03M2I2NTJlMjc3NjgiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJJZ25hY2lvIEdhbGxhcmRvIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaWduYWNpbyIsImdpdmVuX25hbWUiOiJJZ25hY2lvIiwiZmFtaWx5X25hbWUiOiJHYWxsYXJkbyJ9.uVLad67VlA-NOA1hLcXjmSG-IDOyPOyr7_Yj6xp4Y1A794A8AxSzs_pH-YgfoaRHk0yK2DfPn-RCbOPONiqgLjJG7E4m0MUnv7FE-yAcGxfzuWlbuzYPW22nyK5Vd4ylqhnzj-hAo4d0PWsz4V-VgZQRWvSCPLbcUlBLw1q_J59EVstJ7yIRLz9FY014Wk58ZLjWPY6gYhtltL3ZJ_Jz_KjypvaBvdlY792NmTXrzVrvmNlO_vm5nw9oSNk1-bPjEihZORTOyezZc1azjezE8N3vLFjTBk-vj5wOj1NY91VA4iMeHCGKACV_8v47MSeIO-bf0MZaF9ZLt3UAVI1KnA"


class FintrackUser(HttpUser):
    wait_time = between(1, 3)

    @task(3)
    def load_dashboard(self):
        self.client.get(
            "/dashboard",
            headers={"Authorization": f"Bearer {TOKEN}"}
        )

    @task(2)
    def importar_csv(self):
        self.client.post(
            "/importar",
            headers={"Authorization": f"Bearer {TOKEN}"},
            files={"file": ("test.csv", "fecha,monto,descripcion,categoria,tipo")}
        )

    @task(2)
    def validar_importacion(self):
        self.client.get(
            "/validar",
            headers={"Authorization": f"Bearer {TOKEN}"}
        )
