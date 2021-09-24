declare const STORAGE_KEY = "electorateManagement";
declare type FullName = {
    firstName: string;
    lastName: string;
};
declare enum Paties {
    Labour = 0,
    National = 1,
    Green = 2
}
declare class PersonalInfo {
    name: FullName;
    constructor(name: FullName);
}
interface Voter {
    id: number;
    name: FullName;
    vote: number;
    party: Paties;
}
declare class Candidate extends PersonalInfo implements Voter {
    id: number;
    vote: number;
    party: Paties;
    constructor(id: number, name: FullName, party: Paties);
    setVoteCount(totalVotes: number): void;
}
declare class ElectorateManagement {
    allCandidates: Candidate[];
    allTotalVotes: number;
    beforeEditCandidateVote: number;
    editedCandidateName: string | null;
    editedCandidateVote: number | null;
    editedCandidate: Candidate | null;
    name: string;
    constructor();
    getAllCandidates(): Candidate[];
    getAllTotalVotes(): number;
    addCandidateName(newName: FullName, newVote: number): void;
    setCandidateVote(name: string, totalVotes: number): void;
    findCandidate(targetName: string): Candidate | undefined;
    calcPercentVote(name: string): number;
    removeCandidate(targetCandidateName: string): void;
    sortCandidatesByName(): void;
    sortCandidatesByVote(): void;
    getCandidateByFirstNames(name: string): Candidate[];
    get0VoteCandidates(): Candidate[];
    save(): void;
    load(): any;
}