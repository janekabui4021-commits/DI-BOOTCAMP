import math


class Circle:
	def __init__(self, radius):
		if radius < 0:
			raise ValueError("Radius cannot be negative")
		self.radius = radius

	@classmethod
	def from_diameter(cls, diameter):
		if diameter < 0:
			raise ValueError("Diameter cannot be negative")
		return cls(diameter / 2)

	@property
	def diameter(self):
		return self.radius * 2

	def area(self):
		return math.pi * self.radius ** 2

	def __str__(self):
		return f"Circle(radius={self.radius}, diameter={self.diameter})"

	__repr__ = __str__

	def __add__(self, other):
		if not isinstance(other, Circle):
			return NotImplemented
		return Circle(self.radius + other.radius)

	def __gt__(self, other):
		if not isinstance(other, Circle):
			return NotImplemented
		return self.radius > other.radius

	def __eq__(self, other):
		if not isinstance(other, Circle):
			return NotImplemented
		return self.radius == other.radius

	def __lt__(self, other):
		if not isinstance(other, Circle):
			return NotImplemented
		return self.radius < other.radius


if __name__ == "__main__":
	circle1 = Circle(3)
	circle2 = Circle.from_diameter(10)

	print(circle1)
	print(f"Area: {circle1.area():.2f}")
	print(f"Added circles: {circle1 + circle2}")
	print(f"Circle 2 is bigger: {circle2 > circle1}")
	print(f"Circles are equal: {circle1 == circle2}")
	print(f"Sorted circles: {sorted([circle2, circle1])}")
