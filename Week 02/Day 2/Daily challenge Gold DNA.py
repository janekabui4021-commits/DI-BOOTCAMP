import random

# Base class to demonstrate Inheritance & Polymorphism
class BiologicalStructure:
    def mutate(self):
        """Generic mutate interface to be overridden by subclasses."""
        pass


class Gene(BiologicalStructure):
    def __init__(self, value=None):
        # Initialize randomly as 0 or 1 if not specified
        self.value = random.choice([0, 1]) if value is None else value

    def mutate(self):
        # Flips gene value: 0 -> 1, 1 -> 0
        self.value = 1 if self.value == 0 else 0


class Chromosome(BiologicalStructure):
    def __init__(self, genes=None):
        # A Chromosome is a series of 10 Genes
        self.genes = genes if genes is not None else [Gene() for _ in range(10)]

    def mutate(self):
        # Each gene has a 50% (1/2) chance to flip
        for gene in self.genes:
            if random.random() < 0.5:
                gene.mutate()

    def is_all_ones(self):
        return all(gene.value == 1 for gene in self.genes)


class DNA(BiologicalStructure):
    def __init__(self, chromosomes=None):
        # DNA is a series of 10 Chromosomes
        self.chromosomes = chromosomes if chromosomes is not None else [Chromosome() for _ in range(10)]

    def mutate(self):
        # Each chromosome has a 50% (1/2) chance to mutate
        for chromosome in self.chromosomes:
            if random.random() < 0.5:
                chromosome.mutate()

    def is_perfect(self):
        # Checks if all 100 genes (10 chromosomes * 10 genes) are 1s
        return all(chrom.is_all_ones() for chrom in self.chromosomes)


class Organism:
    def __init__(self, dna, environment):
        self.dna = dna
        self.environment = environment  # Environmental mutation probability float (e.g., 0.2)

    def try_mutate(self):
        # Triggers DNA mutation based on environment probability
        if random.random() < self.environment:
            self.dna.mutate()


# ...existing code...

def run_simulation(num_organisms=10, environment_prob=0.2, max_generations=100_000):
    population = [Organism(DNA(), environment_prob) for _ in range(num_organisms)]

    for generations in range(1, max_generations + 1):
        for organism in population:
            organism.try_mutate()

            if organism.dna.is_perfect():
                print(f"Target DNA reached in {generations} generations!")
                return generations

        if generations % 10_000 == 0:
            print(f"{generations} generations completed...")

    print(f"Target DNA was not reached after {max_generations} generations.")
    return None


if __name__ == "__main__":
    run_simulation(num_organisms=10, environment_prob=0.2)