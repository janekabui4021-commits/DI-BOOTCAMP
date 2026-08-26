#1
from abc import ABC, abstractmethod


class Temperature(ABC):

    def __init__(self, value: float):
        self._kelvin = self._to_base_kelvin(value)

    @abstractmethod
    def _to_base_kelvin(self, value: float) -> float:
        """Converts the subclass's initial value into Kelvin base unit."""
        pass

    def to_celsius(self) -> float:
        return self._kelvin - 273.15

    def to_kelvin(self) -> float:
        return self._kelvin

    def to_fahrenheit(self) -> float:
        return (self._kelvin - 273.15) * 9 / 5 + 32


class Celsius(Temperature):

    def _to_base_kelvin(self, value: float) -> float:
        return value + 273.15


class Kelvin(Temperature):

    def _to_base_kelvin(self, value: float) -> float:
        return value


class Fahrenheit(Temperature):

    def _to_base_kelvin(self, value: float) -> float:
        return (value - 32) * 5 / 9 + 273.15


# --- Example Usage ---
c = Celsius(25)
print(f"25°C in Fahrenheit: {c.to_fahrenheit():.2f}°F")
print(f"25°C in Kelvin: {c.to_kelvin():.2f}K")

f = Fahrenheit(98.6)
print(f"98.6°F in Celsius: {f.to_celsius():.2f}°C")

#2
import random


class QuantumParticle:

    def __init__(
        self, x: int = None, y: float = None, p: float = None, name: str = None
    ):
        self.name = name
        self.x = x if x is not None else random.randint(1, 10000)
        self.y = y if y is not None else random.uniform(0, 1)
        self.p = p if p in [0.5, -0.5] else random.choice([0.5, -0.5])
        self.entangled_particle = None

    def _disturbance(self):
        """Triggers quantum interference, updating position and momentum upon measurement."""
        self.x = random.randint(1, 10000)
        self.y = random.uniform(0, 1)
        print("Quantum Interferences!!")

    def position(self) -> int:
        self._disturbance()
        return self.x

    def momentum(self) -> float:
        self._disturbance()
        return self.y

    def spin(self) -> float:
        self._disturbance()

        # Quantum entanglement behavior: update partner particle to opposite spin
        if self.entangled_particle:
            self.entangled_particle.p = -self.p

        return self.p

    def entangle(self, other: "QuantumParticle"):
        if not isinstance(other, QuantumParticle):
            raise TypeError(
                "Can only entangle with another QuantumParticle instance!"
            )

        self.entangled_particle = other
        other.entangled_particle = self
        other.p = -self.p

        if self.name and other.name:
            print(
                f"Particle {self.name} is now in quantum entanglement with Particle {other.name}"
            )
        print("Spooky Action at a Distance !!")

    def __repr__(self) -> str:
        name_str = f"Name: {self.name}, " if self.name else ""
        return f"QuantumParticle({name_str}Position(x)={self.x}, Momentum(y)={self.y:.4f}, Spin(p)={self.p})"


# --- Example Usage ---

p1 = QuantumParticle(x=1, p=0.5, name="p1")
p2 = QuantumParticle(x=2, p=0.5, name="p2")
p1.entangle(p2)

print("\n--- Measuring Particle 1 Spin ---")
print(f"p1 Spin: {p1.spin()}")
print(f"p2 Spin (Opposite): {p2.p}")