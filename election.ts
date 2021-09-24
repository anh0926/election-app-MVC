
"use strict";
const STORAGE_KEY = 'electorateManagement'

type FullName ={
    firstName: string
    lastName: string
}

enum Paties {
    Labour,
    National,
    Green
}
class PersonalInfo {
    name: FullName
   
    constructor (name:FullName){ //1.typed Parameters
        this.name = name;
    }
}

//interface 
interface Voter {
    id: number
    name: FullName
    vote: number
    party: Paties
}


class Candidate extends PersonalInfo implements Voter {
    //properties
    id: number
    vote: number
    party: Paties
    constructor(id: number, name: FullName, party: Paties){  //type parameters
        super(name)
        this.id = id;
        this.name = name;
        this.vote = 0;
        this.party = party
    }
    setVoteCount(totalVotes: number){        
        this.vote = totalVotes
    }    

}
//type parameters.
class ElectorateManagement {
    allCandidates: Candidate[] //typed array
    allTotalVotes: number
    beforeEditCandidateVote: number
    editedCandidateName: string|null//6.	union types 
    editedCandidateVote: number|null //6.	union types 
    editedCandidate: Candidate|null
    name: string


    constructor(){
        this.allCandidates = [];//4.	typed arrays 
        this.allTotalVotes = 0;
        this.beforeEditCandidateVote = 0;
        this.editedCandidateName = null;
        this.editedCandidateVote = null;
        this.name = 'Ilam'
        this.editedCandidate = null;  
    }
    getAllCandidates(){
        return this.allCandidates
    } 

    getAllTotalVotes(){
        return this.allTotalVotes
    }

    addCandidateName(newName: FullName, newVote:number){//typed parameters
        var addedName = newName
        if (!addedName) {
            return 
        }
        const newId = this.allCandidates.length + 1        
        const aNewCandidate = new Candidate (newId, addedName,newVote)
        this.allCandidates.push(aNewCandidate)       
    }

    setCandidateVote(name: string,totalVotes: number){
        var aCandidate:any = this.findCandidate(name); //typed variables 
        const candidate = new Candidate(aCandidate.id, aCandidate.name, aCandidate.vote);
        candidate.setVoteCount(totalVotes);   
        aCandidate.vote = candidate.vote;         
        this.allTotalVotes += candidate.vote; 
    }

    findCandidate (targetName: string): Candidate | undefined{ //6.	union types 
            let result = this.allCandidates.find(aName => aName.name.firstName === targetName || aName.name.lastName === targetName )
            
            return result
    } 
       

    calcPercentVote (name: string) : number { //return type for functi
        console.log(`Calculating the percent vote for: ${name}`);
        let candidate: any = this.findCandidate(name) //typed variable
        let allTotalVotes: number = this.allTotalVotes
        let percentVote: number = (candidate.vote * 100)/allTotalVotes
        return percentVote // 3.	Return types 

    }
               
    removeCandidate(targetCandidateName: string){
        let candidate: any = this.findCandidate(targetCandidateName) //typed variable
        this.allCandidates.splice(candidate.id-1,1)
    }

    sortCandidatesByName(){
        this.allCandidates.sort(function(a,b){
            if (a.name < b.name){
                return -1
            }
            if (a.name > b.name){
                return 1
            }
            return 0;
        })
    }
    sortCandidatesByVote(){
        this.allCandidates.sort(function(a,b){
            if (a.vote < b.vote){
                return -1
            }
            if (a.vote > b.vote){
                return 1
            }
            return 0;
        })
    }
    
    // 12. A calculation across many part
    getCandidateByFirstNames(name: string){
        return this.allCandidates.filter(aCandidate=>aCandidate.name.firstName === name)
    }
    // 4.	Filter parts 
    // 12. A calculation across many part
    get0VoteCandidates(){
        return this.allCandidates.filter(aCandidate=>aCandidate.vote === 0)
    }

    // 7.	Load all parts from LocalStorage
    save (){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allCandidates))
    }

    // 6.	Save all parts to LocalStorage
    load (){
        return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')
    }


    
    
    
}

