const sheetModel = require('../models/googleSheet')
const serviceFinder = require('../services/index')

// const ifUpdateUser = (users) => {
//     for (let i = 0; i < users.length; i++) {}
// }


exports.retrieveUsers = async (req, res) => {
    const spreadsheetId = req.query.sheetId
    try {
        const sheetData = await sheetModel.getAll(spreadsheetId)
        res.send('ok')
        
        for(let i = 0; i < 100; i++){
            const updatedData = {}
            let linkedin = sheetData[i].LinkedIn
            const email = sheetData[i].Email
            const linkedinData = linkedin ? await serviceFinder.nymeraEmailByLinkedin(linkedin) : false
            const muckRackData = sheetData[i]['Muck Rack'] ? await serviceFinder.muckRackAxios(sheetData[i]['Muck Rack']) : false

            if(!linkedin && muckRackData.linkedin) {
                updatedData.LinkedIn = muckRackData.linkedin
                linkedin = muckRackData.linkedin
            }

            if (linkedinData || muckRackData) {
                if (muckRackData.email) {
                    updatedData.Email = muckRackData.email
                } else if (linkedinData.length > 0) {
                    updatedData.Email = linkedinData[0].email
                }

                if (muckRackData.topic) updatedData.Topic = muckRackData.topic
                if (muckRackData.jobTitle) updatedData.JobTitle = muckRackData.jobTitle
                if (muckRackData.email && muckRackData.email !== email) {
                    updatedData.Email = muckRackData.email
                }
            }

            const result = {
                ...sheetData[i],
                ...updatedData,
            }
            const updateResult = await sheetModel.getById(spreadsheetId, i + 2, result)
            console.log(updateResult, 'result')
        }
        console.log('hhhh')
    } catch (e) {
        console.log(e, '---error---')
    }
}





2020-12-23T10:53:21.520092+00:00 app[web.1]: ok result
2020-12-23T10:53:22.567062+00:00 app[web.1]: ok result
2020-12-23T10:53:23.811902+00:00 app[web.1]: ok result
2020-12-23T10:53:24.656120+00:00 app[web.1]: ok result
2020-12-23T10:53:25.680456+00:00 app[web.1]: ok result
2020-12-23T10:53:26.610905+00:00 app[web.1]: ok result
2020-12-23T10:53:27.672581+00:00 app[web.1]: ok result
2020-12-23T10:53:28.600034+00:00 app[web.1]: ok result
2020-12-23T10:53:29.740332+00:00 app[web.1]: ok result
2020-12-23T10:53:30.867083+00:00 app[web.1]: ok result
2020-12-23T10:53:31.915430+00:00 app[web.1]: ok result
2020-12-23T10:53:33.547606+00:00 app[web.1]: ok result
2020-12-23T10:53:34.757837+00:00 app[web.1]: ok result
2020-12-23T10:53:35.620905+00:00 app[web.1]: ok result
2020-12-23T10:53:36.564981+00:00 app[web.1]: ok result
2020-12-23T10:53:37.643562+00:00 app[web.1]: ok result
2020-12-23T10:53:38.166657+00:00 app[web.1]: ok result
2020-12-23T10:53:39.243381+00:00 app[web.1]: ok result
2020-12-23T10:53:40.524620+00:00 app[web.1]: ok result
2020-12-23T10:53:41.750793+00:00 app[web.1]: ok result
2020-12-23T10:53:42.808705+00:00 app[web.1]: ok result
2020-12-23T10:53:43.952744+00:00 app[web.1]: ok result
2020-12-23T10:53:45.053274+00:00 app[web.1]: ok result
2020-12-23T10:53:45.740953+00:00 app[web.1]: ok result
2020-12-23T10:53:46.607444+00:00 app[web.1]: ok result
2020-12-23T10:53:47.431118+00:00 app[web.1]: ok result
2020-12-23T10:53:48.176101+00:00 app[web.1]: ok result
2020-12-23T10:53:49.217134+00:00 app[web.1]: ok result
2020-12-23T10:53:49.934904+00:00 app[web.1]: ok result
2020-12-23T10:53:50.724130+00:00 app[web.1]: ok result
2020-12-23T10:53:51.437808+00:00 app[web.1]: ok result
2020-12-23T10:53:51.944542+00:00 app[web.1]: ok result
2020-12-23T10:53:52.325180+00:00 app[web.1]: ok result
2020-12-23T10:53:53.035627+00:00 app[web.1]: ok result
2020-12-23T10:53:53.643028+00:00 app[web.1]: ok result
2020-12-23T10:53:54.388940+00:00 app[web.1]: ok result
2020-12-23T10:53:55.098894+00:00 app[web.1]: ok result
2020-12-23T10:53:56.344880+00:00 app[web.1]: ok result
2020-12-23T10:53:56.893062+00:00 app[web.1]: ok resul