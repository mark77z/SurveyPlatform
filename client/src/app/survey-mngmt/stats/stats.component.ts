import { Component, OnInit } from '@angular/core';
import { SurveyRepository } from '../../model/survey.repository';
import { AuthService } from 'src/app/model/auth.service';
import { Survey } from '../../model/survey.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{

    public user: User = new User();;
    public surveyId: string;
    public survey: Survey;
    private sub: any;
    public genderChartType: string = 'pie';
    public generatedSurveys: number = 0;
    public countAnsweredSurveys: number = 0;
    public generatedSurvesPercentaje: string;
    public countAnsweredSurveysPercentaje: string;
    public totalGeneralCorrectAnswers: number = 0;
    public totalGeneralQuestions: number = 0;
    public totalCorrectPercentajeStr: string;
    public totalCorrectPercentaje: number = 0;

    constructor(private router: Router, private repository: SurveyRepository, private authService: AuthService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const result = this.authService.authenticated;
        if (result) {
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this.sub = this.route.params.subscribe(params => {
            this.surveyId = params['surveyId'];

            if (this.surveyId != undefined) {
                this.repository.getSurveyById(this.surveyId).subscribe(survey => {
                    this.survey = survey;

                    this.repository.getSurveysAnsweredPerSurvey(this.surveyId).subscribe(data => {
                        this.countAnsweredSurveys = data.count;
                        this.countAnsweredSurveysPercentaje = (data.count * 2) + "%";
                    });

                    this.repository.getSurveysCorrectAnswersForSurvey(this.surveyId).subscribe(data => {
                        this.totalGeneralCorrectAnswers = data.totalCorrect;
                        if (this.totalGeneralCorrectAnswers > 0) {
                            this.totalGeneralQuestions = this.countAnsweredSurveys * this.survey.questions.length;
                            this.totalCorrectPercentaje = this.totalGeneralCorrectAnswers * 100 / this.totalGeneralQuestions;
                            this.totalCorrectPercentaje = parseFloat(this.totalCorrectPercentaje.toFixed(2));
                            this.totalCorrectPercentajeStr = this.totalCorrectPercentaje + "%";
                        } else {
                            this.totalGeneralQuestions = 0;
                            this.totalCorrectPercentaje = 0;
                            this.totalCorrectPercentajeStr = "0%";
                        }
                    });

                    this.repository.getGenderStatsBySurvey(this.surveyId).subscribe(data => {
                        var indexMale = data.result.findIndex(stat => stat._id === "male");
                        var indexFemale = data.result.findIndex(stat => stat._id === "female");

                        var valueMale = 0;
                        var valueFemale = 0;

                        if (indexMale > -1) {
                            valueMale = data.result[indexMale].count;
                        }

                        if (indexFemale > -1) {
                            valueFemale = data.result[indexFemale].count
                        }

                        this.genderChartDatasets = [{ data: [valueMale, valueFemale] }];
                    });

                    this.repository.getAgeStatsBySurvey(this.surveyId).subscribe(data => {
                        var indexunder18 = data.result.findIndex(stat => stat._id === "Under 18");
                        var index1825 = data.result.findIndex(stat => stat._id === "18-25");
                        var index2550 = data.result.findIndex(stat => stat._id === "25-50");
                        var indexOver50 = data.result.findIndex(stat => stat._id === "Over 50");

                        var valueUnder18 = 0;
                        var value1825 = 0;
                        var value2550 = 0;
                        var valueOver50 = 0;

                        if (indexunder18 > -1) {
                            valueUnder18 = data.result[indexunder18].count;
                        }

                        if (index1825 > -1) {
                            value1825 = data.result[index1825].count;
                        }

                        if (index2550 > -1) {
                            value2550 = data.result[index2550].count;
                        }

                        if (indexOver50 > -1) {
                            valueOver50 = data.result[indexOver50].count;
                        }

                        this.ageChartDatasets = [{ data: [valueUnder18, value1825, value2550, valueOver50], label: '' }];
                    });
                });
            } else {
                this.repository.getUserCreatedSurveys(this.user.username).subscribe(data => {
                    this.generatedSurveys = data.count;
                    this.generatedSurvesPercentaje = (data.count * 2) + "%";
                });

                this.repository.getUserCreatedSurveysAnswers(this.user.username).subscribe(data => {
                    this.countAnsweredSurveys = data.totalCount;
                    this.countAnsweredSurveysPercentaje = (data.totalCount * 2) + "%";
                });

                this.repository.getSurveysCorrectAnswersForCreator(this.user.username).subscribe(data => {
                    this.totalGeneralCorrectAnswers = data.totalCorrect;
                });

                this.repository.getSurveysTotalAnswersForCreator(this.user.username).subscribe(data => {
                    this.totalGeneralQuestions = data.result[0].count;
                    this.totalCorrectPercentaje = this.totalGeneralCorrectAnswers * 100 / this.totalGeneralQuestions;
                    this.totalCorrectPercentaje = parseFloat(this.totalCorrectPercentaje.toFixed(2));
                    this.totalCorrectPercentajeStr = this.totalCorrectPercentaje + "%";
                });

                this.repository.getGeneralGenderStats(this.user.username).subscribe(data => {
                    var indexMale = data.result.findIndex(stat => stat._id === "male");
                    var indexFemale = data.result.findIndex(stat => stat._id === "female");

                    var valueMale = 0;
                    var valueFemale = 0;

                    if (indexMale > -1) {
                        valueMale = data.result[indexMale].count;
                    }

                    if (indexFemale > -1) {
                        valueFemale = data.result[indexFemale].count
                    }

                    this.genderChartDatasets = [{ data: [valueMale, valueFemale] }];
                });

                this.repository.getGeneralAgeStats(this.user.username).subscribe(data => {
                    var indexunder18 = data.result.findIndex(stat => stat._id === "Under 18");
                    var index1825 = data.result.findIndex(stat => stat._id === "18-25");
                    var index2550 = data.result.findIndex(stat => stat._id === "25-50");
                    var indexOver50 = data.result.findIndex(stat => stat._id === "Over 50");

                    var valueUnder18 = 0;
                    var value1825 = 0;
                    var value2550 = 0;
                    var valueOver50 = 0;

                    if (indexunder18 > -1) {
                        valueUnder18 = data.result[indexunder18].count;
                    }

                    if (index1825 > -1) {
                        value1825 = data.result[index1825].count;
                    }

                    if (index2550 > -1) {
                        value2550 = data.result[index2550].count;
                    }

                    if (indexOver50 > -1) {
                        valueOver50 = data.result[indexOver50].count;
                    }

                    this.ageChartDatasets = [{ data: [valueUnder18, value1825, value2550, valueOver50], label: '' }];
                });
            }
        });
    }

    public genderChartDatasets: Array<any> = [{ data: [0, 0] }];

    public genderChartLabels: Array<any> = ['Male', 'Female'];

    public genderChartColors: Array<any> = [
        {
            backgroundColor: ['#0080ff', '#ff99dd'],
            hoverBackgroundColor: ['#66b3ff', '#ffccee'],
            borderWidth: 2
        }
    ];

    public genderChartOptions: any = {
        responsive: true
    };

    public ageChartType: string = 'bar';

    public ageChartDatasets: Array<any> = [
        { data: [0, 0, 0, 0], label: '' }
    ];

    public ageChartLabels: Array<any> = ['Under 18', '18-25', '25-50', 'Over 50'];

    public ageChartColors: Array<any> = [
        {
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(89, 73, 228, 0.5)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(89, 73, 228, 1)'
            ],
            borderWidth: 2,
        }
    ];

    public ageChartOptions: any = {
        responsive: true
    };

    public exportGeneralStats() {
        var data = document.getElementById('stats-exportable');
        html2canvas(data, { scrollY: - window.scrollY }).then(function (canvas) {
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jspdf.jsPDF('landscape', 'px', 'a4');
            pdf.addImage(contentDataURL, 'PNG', 20, 20, 500, 400);
            pdf.save('generalStats.pdf');
        });
    }


    public exportStatsBySurvey(surveyTitle: string) {
        var data = document.getElementById('stats-exportable');
        html2canvas(data, { scrollY: - window.scrollY }).then(function (canvas) {
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jspdf.jsPDF('landscape', 'px', 'a4');
            pdf.addImage(contentDataURL, 'PNG', 20, 20, 500, 400);
            pdf.save(surveyTitle + '_stats.pdf');
        });
    }
}