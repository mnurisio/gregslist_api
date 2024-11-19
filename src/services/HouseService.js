import { dbContext } from "../db/DbContext"


class HouseService{


   async getHouseById(houseId) {
        const house = (await dbContext.Houses.findById(houseId)).populated('creator')
        return house
    }


    async getHouses(houseQuery) {

        const pageNumber = parseInt(houseQuery.page)
        const houseLimit = 10
        const skipAmount = (pageNumber - 1) * houseLimit
        delete houseQuery.page

        const sortBy = houseQuery.sortBy
        delete houseQuery.sortBy

        const houses = await dbContext.Houses
        .find(houseQuery)
        .sort(sortBy)
        .skip(skipAmount)
        .limit(houseLimit)
        .populate('creator')

        const houseCount = await dbContext.Houses.countDocuments(houseQuery)

        const houseResponse = {
            count: houseCount,
            page: pageNumber,
            totalPages: Math.ceil(houseCount / houseLimit),
            results: houses
        }
        return houseResponse
    }

}

export const houseService = new HouseService()