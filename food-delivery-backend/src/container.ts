import {Container} from 'inversify';
import { EnvType, environment } from './config/environment';
import { ServiceIdentifier } from './config/service-identifier';

export const container = new Container();

container.bind<EnvType>(ServiceIdentifier.EnvType).toConstantValue(environment)