//leetcode daily 2/25/2024
//graph with union-find structure

class UnionFind {
    constructor(size) {
        this.parent = Array.from({length: size}, (_, i) => i);
        this.rank = Array(size).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
        }
    }
}

function canTraverseAllPairs(nums) {
    const MAX_VAL = 100000;
    const uf = new UnionFind(MAX_VAL + nums.length + 1);
    const primes = Array.from({length: MAX_VAL + 1}, (_, i) => i).filter(i => i > 1 && Array.from({length: Math.sqrt(i) + 1}, (_, j) => j).slice(2).every(j => i % j !== 0));

    for (let i = 0; i < nums.length; i++) {
        for (let prime of primes) {
            if (prime > nums[i]) break;
            if (nums[i] % prime === 0) {
                uf.union(i, nums.length + prime);
                while (nums[i] % prime === 0) {
                    nums[i] /= prime;
                }
            }
        }
        if (nums[i] > 1) {
            uf.union(i, nums.length + nums[i]);
        }
    }

    const parent = uf.find(0);
    for (let i = 1; i < nums.length; i++) {
        if (uf.find(i) !== parent) {
            return false;
        }
    }
    return true;
}

function main(){
    let nums = [2,3,6];
    console.log(canTraverseAllPairs(nums)); //true
    nums = null;
}


main();
