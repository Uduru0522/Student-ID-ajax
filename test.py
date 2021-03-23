class C:
    elem = 123

    def __init__(self, num):
        self.elem = num

    def __add__(self, other):
        self.elem += other.elem

a = C(1)
b = C(2)

a = a + b

print(a.elem)
