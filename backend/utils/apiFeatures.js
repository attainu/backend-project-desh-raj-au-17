class APIFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        }: {}
        console.log(keyword)
        this.query = this.query.find({ ...keyword })
        return this
    }

    filter(){
        const queryCopy = { ...this.queryStr }

        console.log(queryCopy)

        //Removing feilds from the query 

        const removeFeilds = ['keyword', 'limit', 'page']
        removeFeilds.forEach(e1 => delete queryCopy[e1])
        console.log(queryCopy)

    }
}

module.exports = APIFeatures