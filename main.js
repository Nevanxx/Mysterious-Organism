// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * 4)];
  };
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };
  
  // Factory function for creating pAequor objects
  const pAequorFactory = (specimenNum, dna) => {
    return {
      specimenNum: specimenNum,
      dna: dna,
      
      // Mutate method to change a random base in the DNA
      mutate() {
        const randomIndex = Math.floor(Math.random() * this.dna.length);
        let newBase;
        do {
          newBase = returnRandBase();
        } while (newBase === this.dna[randomIndex]); // Ensure it's a different base
        this.dna[randomIndex] = newBase;
        return this.dna;
      },
      
      // Compare DNA method to calculate similarity with another pAequor
      compareDNA(otherPAequor) {
        let identicalBases = 0;
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === otherPAequor.dna[i]) {
            identicalBases++;
          }
        }
        const percentageCommon = ((identicalBases / this.dna.length) * 100).toFixed(2);
        console.log(`specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${percentageCommon}% DNA in common.`);
      },
      
      // Method to determine survival based on the percentage of 'C' and 'G' bases
      willLikelySurvive() {
        const cgBases = this.dna.filter(base => base === 'C' || base === 'G').length;
        const survivalRate = (cgBases / this.dna.length) * 100;
        return survivalRate >= 60;
      }
    };
  };
  
  // Create a specimen and test the willLikelySurvive method
  const specimen = pAequorFactory(1, mockUpStrand());
  
  // Array to store the 30 surviving specimens
  const survivingSpecimens = [];
  
  // Generate 30 pAequor instances that are likely to survive
  let specimenNumber = 1;
  while (survivingSpecimens.length < 30) {
    let newSpecimen = pAequorFactory(specimenNumber, mockUpStrand());
    if (newSpecimen.willLikelySurvive()) {
      survivingSpecimens.push(newSpecimen);
    }
    specimenNumber++;
  }
  
  console.log(survivingSpecimens);
  
  