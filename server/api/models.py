class Ciphers(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    plaintext = db.Column(db.String(300))
    key = db.Column(db.String(200))
    ciphertext = db.Column(db.String(300))

    def __init__(self, plaintext, key, ciphertext):
        self.plaintext = plaintext
        self.key = key
        self.ciphertext = ciphertext

class CiphersSchema(ma.Schema):
    class Meta:
        fields = ("plaintext", "key", "ciphertext")

ciphers_schema = CiphersSchema()