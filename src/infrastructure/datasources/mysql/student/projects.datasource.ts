import { ProjectsModel } from '../../../../data/mysqldb';
import { CustomError, IProjectsDataSource, ProjectsEntity } from '../../../../domain';
import { OptionalProjectsDto, ProjectsDto } from '../../../../domain/dtos/student/projects';
import { ProjectsMapper } from '../../../mappers';


export class ProjectsDataSource implements IProjectsDataSource {
    
    
    async register(projectsDto: ProjectsDto): Promise<ProjectsEntity> {
        
        const { description, date, studentId } = projectsDto;
        
        try {
            
            const project =  ProjectsModel.build({
                description,
                date,
                studentId
            });

            const savedProject = await project.save();

            return ProjectsMapper.projectsEntityFromObject(savedProject.toJSON());

        } catch (error) {
            
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    
    }
    async update(optProjectsDto: OptionalProjectsDto): Promise<boolean> {
        const { id, description, date, studentId } = optProjectsDto;

        try {
            
            const exist = await ProjectsModel.findOne({ where: { id, studentId } });

            if(!exist) {
                throw CustomError.notFound('Project not found');
            }

            const project = await ProjectsModel.update({
                description,
                date
            }, { where: { id, studentId } });

            return project.at(0) === 1;
        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }

    }
    async getByStudentId(studentId: string): Promise<ProjectsEntity[] | null> {
        
        try {

            const projects = await ProjectsModel.findAll({ where: { studentId } });
            
            if(!projects) {
                return null;
            }

            return projects.map(ProjectsMapper.projectsEntityFromObject);

        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }

    async delete(id: string): Promise<boolean> {
        
        try {

            const project = await ProjectsModel.destroy({ where: { id } });

            return project === 1;

        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }




}