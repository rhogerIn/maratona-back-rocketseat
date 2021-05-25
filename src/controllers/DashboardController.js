const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/jobUtils')

module.exports = {
    async index(req, res){
        const jobs = await Job.get();
        const profile = await Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        };
        let jobTotalHours = 0;

            // Ajustes no JOB apresentado no Index.
            const updatedJobs = jobs.map((job) => {
                const remaining = JobUtils.remainingDays(job);          
                //IF TERNÁRIO - Se REMAINING for menor que 0 então 'done' senão 'progress';
                const status = remaining <= 0 ? 'done' : 'progress';     
                
                // Soma de status dependendendo do status do Job.
                // += Pegando o valor de uma variavel e somando + 1 com o valor dela mesmo.
                statusCount[status] += 1;
                
                // Código refatorado do if abaixo.
                jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours;
                /*
                if(status == 'progress'){
                jobTotalHours += Number(job['daily-hours']);
                }*/
                return {
                    ...job,
                    remaining,
                    status,
                    budget: JobUtils.calculateBudget(job, profile['value-hour']),
                }
                        /* Return em forma de espalhamento de um objeto,
                         * Estou destrinchando o objeto com suas propriedades padrões,
                         * e Adicionando remaining e status a mais criando um novo objeto.
                         */
            })


            //Quantidade de horas livres por dia.
            const freeHours = profile['hours-per-day'] - jobTotalHours; 
            //freeHours = freeHours <= 0 ? 'Você não tem horas livres' : 'Você tem '+freeHours+' horas livres no seu dia';
            

        return res.render("index", { jobs: updatedJobs,  
                                     profile: profile, 
                                     statusCount: statusCount, 
                                     freeHours: freeHours});
    }
}