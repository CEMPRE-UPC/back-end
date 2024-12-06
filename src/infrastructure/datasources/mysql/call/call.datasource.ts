import { ValidationError } from 'sequelize';
import { CallModel } from '../../../../data/mysqldb/models/call';
import { CallDto, CallEntity, CustomError, ICallDataSource, OptionalCallDto } from '../../../../domain';
import { CallMapper, SequelizeErrorMapper } from '../../../mappers';
import { Status } from '../../../../domain/types/call';




export class CallDataSource implements ICallDataSource {

    async register(callDto: CallDto): Promise<CallEntity> {

        try {

            const exist = await CallModel.findOne({
                where: { practiceId: callDto.practiceId, name: callDto.name }
            });

            if (exist) throw CustomError.badRequest('Call already exists');

            const call = CallModel.build({ ...callDto });

            await call.save();

            return CallMapper.callEntityFromObject(call.toJSON());

        } catch (error) {


            if (error instanceof CustomError) {
                throw error;
            }
            if (error instanceof ValidationError) {
                const errors = SequelizeErrorMapper.customErrorFromObject(error);
                const { msg, field } = errors[0];
                throw CustomError.badRequest(`${msg} in field ${field}`);
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async update(optCallDto: OptionalCallDto): Promise<boolean> {
        console.log("################ OptionalCallDto.create ################");
        console.log(optCallDto);

        const { id } = optCallDto;
        try {

            const affectedCount = await CallModel.update(optCallDto, { where: { id } });

            return affectedCount[0] === 1;

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }
            if (error instanceof ValidationError) {
                const errors = SequelizeErrorMapper.customErrorFromObject(error);
                const { msg, field } = errors[0];
                throw CustomError.badRequest(`${msg} in field ${field}`);
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async getById(id: string): Promise<CallEntity | null> {

        try {

            const call = await CallModel.findByPk(id);

            if (!call) return null;

            return CallMapper.callEntityFromObject(call.toJSON());

        } catch (error) {

            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async delete(id: string): Promise<boolean> {

        try {

            const affectedCount = await CallModel.destroy({ where: { id } });

            return affectedCount === 1;

        } catch (error) {

            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async getAllCalls(): Promise<CallEntity[] | null> {
        try {

            const calls = await CallModel.findAll();

            if (!calls) return null;

            return calls.map(CallMapper.callEntityFromObject);

        } catch (error) {

            console.log(error);
            throw CustomError.internalServer();
        }
    }

    async getByPracticeId(practiceId: string): Promise<CallEntity | null> {

        try {

            const call = await CallModel.findOne({ where: { practiceId, status: Status.Open } });

            if (!call) return null;

            return CallMapper.callEntityFromObject(call.toJSON());
        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }
            if (error instanceof ValidationError) {
                const errors = SequelizeErrorMapper.customErrorFromObject(error);
                const { msg, field } = errors[0];
                throw CustomError.badRequest(`${msg} in field ${field}`);
            }
            console.log(error);
            throw CustomError.internalServer();


        }
    }



}