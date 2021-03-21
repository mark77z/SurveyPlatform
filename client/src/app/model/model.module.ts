import { NgModule } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { StaticDataSource } from './static.datasource';
import { HttpClientModule } from '@angular/common/http';
import { SurveyRepository} from './survey.repository';

@NgModule({
  imports: [HttpClientModule],
  providers: [SurveyRepository, 
  {provide: StaticDataSource, useClass: RestDataSource},
  RestDataSource]
})
export class ModelModule {}
