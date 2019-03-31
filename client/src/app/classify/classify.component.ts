import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css']
})
export class ClassifyComponent implements OnInit {
  symptomForm: FormGroup;
  symptoms = [];
  external_text = "Please upload a picture of external symptoms."
  external_desc = "Describe the uploaded picture";
  internal_text = "Which symptoms apply to you:";
  app_name = "skine";
  possibleSymptoms = ['Heberden's node', 'Murphy's sign', 'Stahli's line', 'abdomen acute', 'abdominal bloating', 'abdominal tenderness', 'abnormal sensation', 'abnormally  hard consistency', 'abnormally hard consistency', 'abortion', 'abscess bacterial', 'absences finding', 'achalasia', 'ache', 'adverse reaction', 'agitation', 'air fluid level', 'alcohol binge episode', 'alcoholic withdrawal symptoms', 'ambidexterity', 'angina  pectoris', 'angina pectoris', 'anorexia', 'anosmia', 'aphagia', 'apyrexial', 'arthralgia', 'ascites', 'asterixis', 'asthenia', 'asymptomatic', 'ataxia', 'atypia', 'aura', 'awakening early', 'barking cough', 'bedridden', 'behavior hyperactive', 'behavior showing increased motor activity', 'blackout', 'blanch', 'bleeding of vagina', 'bowel sounds decreased', 'bradycardia', 'bradykinesia', 'breakthrough pain', 'breath  sounds decreased', 'breath sounds decreased', 'breath-holding spell', 'breech presentation', 'bruit', 'burning  sensation', 'burning sensation', 'cachexia', 'cardiomegaly', 'cardiovascular  finding', 'catatonia', 'catching breath', 'charleyhorse', 'chest  tightness', 'chest discomfort', 'chest tightness', 'chill', 'choke', 'cicatrisation', 'clammy skin', 'clonus', 'clumsiness', 'colic abdominal', 'consciousness clear', 'constipation', 'coordination abnormal', 'cough', 'cushingoid facies', 'cyanosis', 'cystic lesion', 'debilitation', 'decompensation', 'decreased  translucency', 'decreased body weight', 'decreased stool caliber', 'decreased translucency', 'diarrhea', 'difficulty', 'difficulty passing urine', 'disequilibrium', 'distended  abdomen', 'distended abdomen', 'distress  respiratory', 'distress respiratory', 'disturbed family', 'dizziness', 'dizzy spells', 'drool', 'drowsiness', 'dullness', 'dysarthria', 'dysdiadochokinesia', 'dysesthesia', 'dyspareunia', 'dyspnea', 'dyspnea  on exertion', 'dyspnea on exertion', 'dysuria', 'ecchymosis', 'egophony', 'elation', 'emphysematous change', 'energy  increased', 'energy increased', 'enuresis', 'erythema', 'estrogen use', 'excruciating pain', 'exhaustion', 'extrapyramidal sign', 'extreme exhaustion', 'facial  paresis', 'facial paresis', 'fall', 'fatigability', 'fatigue', 'fear of falling', 'fecaluria', 'feces in rectum', 'feeling  hopeless', 'feeling  suicidal', 'feeling hopeless', 'feeling strange', 'feeling suicidal', 'feels hot/feverish', 'fever', 'flare', 'flatulence', 'floppy', 'flushing', 'focal seizures', 'food  intolerance', 'food intolerance', 'formication', 'frail', 'fremitus', 'frothy sputum', 'gag', 'gasping for breath', 'general  discomfort', 'general discomfort', 'general unsteadiness', 'giddy mood', 'gravida 0', 'gravida 10', 'green  sputum', 'green sputum', 'groggy', 'guaiac positive', 'gurgle', 'hacking cough', 'haemoptysis', 'haemorrhage', 'hallucinations  auditory', 'hallucinations  visual', 'hallucinations auditory', 'hallucinations visual', 'has religious belief', 'headache', 'heartburn', 'heavy feeling', 'heavy legs', 'hematochezia', 'hematocrit decreased', 'hematuria', 'heme positive', 'hemianopsia homonymous', 'hemiplegia', 'hemodynamically stable', 'hepatomegaly', 'hepatosplenomegaly', 'hirsutism', 'hoard', 'hoarseness', 'homelessness', 'homicidal thoughts', 'hot flush', 'hunger', 'hydropneumothorax', 'hyperacusis', 'hypercapnia', 'hyperemesis', 'hyperhidrosis disorder', 'hyperkalemia', 'hypersomnia', 'hypersomnolence', 'hypertonicity', 'hyperventilation', 'hypesthesia', 'hypoalbuminemia', 'hypocalcemia result', 'hypokalemia', 'hypokinesia', 'hypometabolism', 'hyponatremia', 'hypoproteinemia', 'hypotension', 'hypothermia, natural', 'hypoxemia', 'immobile', 'impaired cognition', 'inappropriate affect', 'incoherent', 'indifferent mood', 'intermenstrual heavy bleeding', 'intoxication', 'irritable  mood', 'irritable mood', 'jugular  venous distention', 'jugular venous distention', 'labored breathing', 'lameness', 'large-for-dates fetus', 'left atrial hypertrophy', 'lesion', 'lethargy', 'lightheadedness', 'lip smacking', 'loose associations', 'low back pain', 'lung nodule', 'macerated skin', 'macule', 'malaise', 'mass in breast', 'mass of body structure', 'mediastinal shift', 'mental  status changes', 'mental status changes', 'metastatic lesion', 'milky', 'moan', 'monoclonal', 'monocytosis', 'mood  depressed', 'mood depressed', 'moody', 'motor  retardation', 'motor retardation', 'muscle hypotonia', 'muscle twitch', 'myalgia', 'mydriasis', 'myoclonus', 'nasal discharge present', 'nasal flaring', 'nausea', 'nausea and vomiting', 'neck stiffness', 'neologism', 'nervousness', 'night  sweat', 'night sweat', 'nightmare', 'no known drug allergies', 'no status change', 'noisy respiration', 'non-productive  cough', 'non-productive cough', 'nonsmoker', 'numbness', 'numbness  of hand', 'numbness of hand', 'oliguria', 'orthopnea', 'orthostasis', 'out  of breath', 'out of breath', 'overweight', 'pain', 'pain  chest', 'pain abdominal', 'pain back', 'pain chest', 'pain foot', 'pain in lower limb', 'pain neck', 'painful swallowing', 'pallor', 'palpitation', 'panic', 'pansystolic murmur', 'para 1', 'para 2', 'paralyse', 'paraparesis', 'paresis', 'paresthesia', 'passed stones', 'patient non compliance', 'pericardial friction rub', 'phonophobia', 'photophobia', 'photopsia', 'pin-point pupils', 'pleuritic  pain', 'pleuritic pain', 'pneumatouria', 'polydypsia', 'polymyalgia', 'polyuria', 'poor dentition', 'poor feeding', 'posterior rhinorrhea', 'posturing', 'presence of q wave', 'pressure  chest', 'pressure chest', 'previous pregnancies 2', 'primigravida', 'prodrome', 'productive  cough', 'productive cough', 'projectile vomiting', 'prostate tender', 'prostatism', 'proteinemia', 'pruritus', 'pulse absent', 'pulsus paradoxus', 'pustule', 'qt interval prolonged', 'r wave feature', 'rale', 'rambling speech', 'rapid shallow breathing', 'red blotches', 'redness', 'regurgitates after swallowing', 'renal angle tenderness', 'rest pain', 'retch', 'retropulsion', 'rhd positive', 'rhonchus', 'rigor - temperature-associated observation', 'rolling of eyes', 'room spinning', 'satiety early', 'scar tissue', 'sciatica', 'scleral icterus', 'scratch marks', 'sedentary', 'seizure', 'sensory discomfort', 'shooting pain', 'shortness  of breath', 'shortness of breath', 'side pain', 'sinus rhythm', 'sleeplessness', 'sleepy', 'slowing of urinary stream', 'sneeze', 'sniffle', 'snore', 'snuffle', 'soft tissue swelling', 'sore to touch', 'spasm', 'speech  slurred', 'speech slurred', 'splenomegaly', 'spontaneous rupture of membranes', 'sputum purulent', 'st segment depression', 'st segment elevation', 'stiffness', 'stinging sensation', 'stool color yellow', 'stridor', 'stuffy nose', 'stupor', 'suicidal', 'superimposition', 'sweat', 'swelling', 'symptom  aggravating factors', 'symptom aggravating factors', 'syncope', 'systolic ejection murmur', 'systolic murmur', 't wave inverted', 'tachypnea', 'tenesmus', 'terrify', 'thicken', 'throat sore', 'throbbing sensation quality', 'tinnitus', 'titubation', 'todd paralysis', 'tonic seizures', 'transaminitis', 'transsexual', 'tremor', 'tremor resting', 'tumor cell invasion', 'unable  to concentrate', 'unable to concentrate', 'unconscious  state', 'unconscious state', 'uncoordination', 'underweight', 'unhappy', 'unresponsiveness', 'unsteady  gait', 'unsteady gait', 'unwell', 'urge  incontinence', 'urge incontinence', 'urgency of micturition', 'urinary hesitation', 'urinoma', 'verbal  auditory hallucinations', 'verbal auditory hallucinations', 'verbally abusive behavior', 'vertigo', 'vision blurred', 'vomiting', 'weepiness', 'weight gain', 'welt', 'wheelchair bound', 'wheezing', 'withdraw', 'worry', 'yellow  sputum', 'yellow sputum'];


  constructor(private fb: FormBuilder, private httpService: HttpService) {
    // const formControls = this.symptoms.map(control => new FormControl(false));
    // this.symptomForm = this.fb.group({
    //   symptoms: new FormArray(formControls)
    // });
  }

  ngOnInit() {
  }

  submitInt(){
    const selectedPreferences = this.symptomForm.value.symptoms
    .map((checked, index) => checked ? this.symptoms[index].id : null)
    .filter(value => value !== null);
    this.httpService.classify(selectedPreferences).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log('error');
      }
    );
  }

  submitImg(){
    const pic = (<HTMLInputElement>document.getElementById('image')).files[0];
    this.httpService.uploadImg(pic).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log('error');
      }
    );
}

  add(value : string){
    if(this.symptoms.indexOf(value)==-1){
      this.symptoms.push(value);
    }
  }

  get formData() { return <FormArray>this.symptomForm.get('symptoms'); }

}
