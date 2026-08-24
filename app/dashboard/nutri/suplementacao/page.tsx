'use client';

import React, { useState } from 'react';

interface AtivoItem {
  id: string;
  ativo: string;
  dosagem: string;
  posologia: string;
  mecanismo: string;
}

interface FormulaPronta {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  icone: string;
  ativos: AtivoItem[];
}

// BANCO DE DADOS ROBUSTO COM +100 ATIVOS CLINICOS
const BANCO_DE_DADOS_ATIVOS = [
  // ESTÉTICA, DERMATOLOGIA & NUTRACÊUTICOS (1 - 15)
  { ativo: 'Silício Orgânico (Nutricolin/Exsynutriment)', dosagemSugerida: '100mg', posologia: '1 cápsula ao dia longe das refeições', categoria: 'Estética', mecanismo: 'Estímulo da síntese de colágeno e queratina' },
  { ativo: 'Verisol (Colágeno Bioativo)', dosagemSugerida: '2.5g', posologia: 'Diluir em água e tomar 1x ao dia', categoria: 'Estética', mecanismo: 'Melhora da elasticidade da pele e redução de rugas' },
  { ativo: 'Biotina (Vitamina B7)', dosagemSugerida: '2.5mg', posologia: '1 cápsula no almoço', categoria: 'Estética', mecanismo: 'Fortalecimento da matriz capilar e unhas' },
  { ativo: 'Ácido Hialurônico Oral', dosagemSugerida: '100mg', posologia: '1 cápsula pela manhã', categoria: 'Estética', mecanismo: 'Hidratação profunda e preenchimento cutâneo' },
  { ativo: 'Cisteína / N-Acetilcisteína (NAC)', dosagemSugerida: '600mg', posologia: '1 cápsula pela manhã em jejum', categoria: 'Estética', mecanismo: 'Precursor de glutationa e detoxificação hepática' },
  { ativo: 'Resveratrol (Trans-Resveratrol)', dosagemSugerida: '100mg', posologia: '1 cápsula junto ao jantar', categoria: 'Estética', mecanismo: 'Potente ação antioxidante e anti-aging' },
  { ativo: 'Luteína + Zeaxantina', dosagemSugerida: '10mg + 2mg', posologia: '1 cápsula no almoço', categoria: 'Estética', mecanismo: 'Proteção fotocutânea e saúde ocular' },
  { ativo: 'Astaxantina', dosagemSugerida: '4mg', posologia: '1 cápsula junto ao almoço', categoria: 'Estética', mecanismo: 'Carotenoide antioxidante e fotoproteção oral' },
  { ativo: 'Picnogenol (Pinus Pinaster)', dosagemSugerida: '100mg', posologia: '1 cápsula após o café da manhã', categoria: 'Estética', mecanismo: 'Tratamento de melasma e saúde vascular' },
  { ativo: 'Oli-Ola (Extrato da Oliva)', dosagemSugerida: '300mg', posologia: '1 cápsula ao dia', categoria: 'Estética', mecanismo: 'Peeling oral e clareamento de manchas' },
  { ativo: 'Dimethicone / DGD', dosagemSugerida: '50mg', posologia: '1 cápsula 2x ao dia', categoria: 'Estética', mecanismo: 'Suporte à textura cutânea' },
  { ativo: 'Coenzima Q10 Lipossomal (Estética)', dosagemSugerida: '50mg', posologia: '1 cápsula no almoço', categoria: 'Estética', mecanismo: 'Antioxidante mitocondrial para celulite e pele' },
  { ativo: 'MSM (Metilsulfonilmetano)', dosagemSugerida: '500mg', posologia: '1 cápsula 2x ao dia', categoria: 'Estética', mecanismo: 'Enxofre orgânico para síntese de colágeno' },
  { ativo: 'Keranat', dosagemSugerida: '300mg', posologia: '1 cápsula após refeição principal', categoria: 'Estética', mecanismo: 'Diminuição do eflúvio e volume capilar' },
  { ativo: 'FC Oral (Caviar Phospholipids)', dosagemSugerida: '200mg', posologia: '1 cápsula pela manhã', categoria: 'Estética', mecanismo: 'Ação anti-inflamatória em acne e dermatites' },

  // NUTRIÇÃO ESPORTIVA, PERFORMANCE & AMINOÁCIDOS (16 - 32)
  { ativo: 'Creatina Monohidratada', dosagemSugerida: '5g', posologia: 'Tomar diariamente com carboidrato', categoria: 'Esportiva', mecanismo: 'Ressíntese de ATP, força e hipertrofia' },
  { ativo: 'Beta-Alanina', dosagemSugerida: '3g a 6g', posologia: 'Fracionar ao longo do dia', categoria: 'Esportiva', mecanismo: 'Tamponamento de acidez muscular (retarda fadiga)' },
  { ativo: 'L-Citrulina Malato', dosagemSugerida: '3g', posologia: '30 min antes do treino', categoria: 'Esportiva', mecanismo: 'Aumento da vasodilatação e óxido nítrico' },
  { ativo: 'Whey Protein Isolado', dosagemSugerida: '30g', posologia: 'Diluir em 200ml de água pós-treino', categoria: 'Esportiva', mecanismo: 'Aporte proteico de alto valor biológico' },
  { ativo: 'BCAA 2:1:1', dosagemSugerida: '5g', posologia: 'Antes ou durante o treino', categoria: 'Esportiva', mecanismo: 'Estímulo da síntese proteica (mTOR)' },
  { ativo: 'L-Carnitina Tartarato', dosagemSugerida: '2g', posologia: '30 min antes do treino', categoria: 'Esportiva', mecanismo: 'Oxidação de ácidos graxos na mitocôndria' },
  { ativo: 'HMB (Beta-Hidroxi-Beta-Metilbutirato)', dosagemSugerida: '3g', posologia: 'Fracionado 3x ao dia', categoria: 'Esportiva', mecanismo: 'Anti-catabólico e preservação de massa muscular' },
  { ativo: 'L-Arginina', dosagemSugerida: '1g a 3g', posologia: '30 min antes do treino', categoria: 'Esportiva', mecanismo: 'Precursor direto de óxido nítrico' },
  { ativo: 'Taurina', dosagemSugerida: '1g', posologia: 'Pré-treino ou pela manhã', categoria: 'Esportiva', mecanismo: 'Osmo-regulação e foco neuromuscular' },
  { ativo: 'Palatinose (Isomaltulose)', dosagemSugerida: '15g', posologia: 'Pré ou intra-treino', categoria: 'Esportiva', mecanismo: 'Carboidrato de baixo índice glicêmico' },
  { ativo: 'Cluster Dextrin (Dextrina Cíclica)', dosagemSugerida: '25g', posologia: 'Intra-treino', categoria: 'Esportiva', mecanismo: 'Esvaziamento gástrico ultra rápido' },
  { ativo: 'AstraGin', dosagemSugerida: '50mg', posologia: 'Junto à suplementação esportiva', categoria: 'Esportiva', mecanismo: 'Aumento da absorção de aminoácidos' },
  { ativo: 'L-Leucina Isolada', dosagemSugerida: '3g', posologia: 'Junto às refeições principais', categoria: 'Esportiva', mecanismo: 'Gatilho leucínico para síntese proteica' },
  { ativo: 'Glutamina Peptídeo', dosagemSugerida: '5g', posologia: 'Pós-treino', categoria: 'Esportiva', mecanismo: 'Recuperação muscular e imunidade' },
  { ativo: 'Glicerol em Pó (HydroMax)', dosagemSugerida: '2g', posologia: 'Pré-treino com 500ml de água', categoria: 'Esportiva', mecanismo: 'Hiper-hidratação e pump muscular' },
  { ativo: 'Nitrato de Beterraba (Sabeet)', dosagemSugerida: '500mg', posologia: '1h antes do treino', categoria: 'Esportiva', mecanismo: 'Vasodilatação e eficiência de oxigênio' },
  { ativo: 'Peak O2 (Mix de Cogumelos Adaptógenos)', dosagemSugerida: '1g', posologia: '30 min antes do treino', categoria: 'Esportiva', mecanismo: 'Aumento da captação máxima de oxigênio (VO2)' },

  // METABOLISMO, EMAGRECIMENTO & APETITE (33 - 48)
  { ativo: 'Morosil (Laranja Moro)', dosagemSugerida: '500mg', posologia: '1 cápsula no almoço', categoria: 'Metabolismo', mecanismo: 'Gerenciamento de peso e gordura visceral' },
  { ativo: 'Cacti-Nea (Drenagem Oral)', dosagemSugerida: '500mg', posologia: '1 cápsula no café da manhã', categoria: 'Metabolismo', mecanismo: 'Ação diurética sem perda de minerais' },
  { ativo: 'Picolinato de Cromo', dosagemSugerida: '250mcg', posologia: '1 cápsula às 15h', categoria: 'Metabolismo', mecanismo: 'Sensibilidade à insulina e desejo por doces' },
  { ativo: '5-HTP (5-Hidroxitriptofano)', dosagemSugerida: '100mg', posologia: '1 cápsula às 17h', categoria: 'Metabolismo', mecanismo: 'Precursor de serotonina e compulsão alimentar' },
  { ativo: 'Berberina HCL', dosagemSugerida: '500mg', posologia: '1 cápsula antes do almoço e jantar', categoria: 'Metabolismo', mecanismo: 'Ativação de AMPK e controle glicêmico' },
  { ativo: 'Pholianegra', dosagemSugerida: '300mg', posologia: '30 min antes das refeições', categoria: 'Metabolismo', mecanismo: 'Retardo do esvaziamento gástrico' },
  { ativo: 'Mitburn', dosagemSugerida: '50mg', posologia: '1 cápsula após café da manhã', categoria: 'Metabolismo', mecanismo: 'Estimula a biogênese mitocondrial' },
  { ativo: 'Slendesta', dosagemSugerida: '300mg', posologia: '1h antes das refeições principais', categoria: 'Metabolismo', mecanismo: 'Aumento da liberação de CCK (saciedade)' },
  { ativo: 'EGCG (Extrato de Chá Verde 90%)', dosagemSugerida: '250mg', posologia: '1 cápsula após almoço', categoria: 'Metabolismo', mecanismo: 'Termogênese e oxidação de gordura' },
  { ativo: 'Capsiate (Pimenta Doce)', dosagemSugerida: '6mg', posologia: '1 cápsula pela manhã', categoria: 'Metabolismo', mecanismo: 'Aumento do gasto energético basal' },
  { ativo: 'Garcinia Cambogia (Ácido Hidroxicítrico)', dosagemSugerida: '500mg', posologia: '30 min antes do almoço', categoria: 'Metabolismo', mecanismo: 'Inibição da lipogênese de novo' },
  { ativo: 'Gymnema Sylvestre', dosagemSugerida: '200mg', posologia: '1 cápsula antes de refeições doces', categoria: 'Metabolismo', mecanismo: 'Bloqueio dos receptores de doçura na língua' },
  { ativo: 'Citrus Aurantium (Sinefrina)', dosagemSugerida: '300mg', posologia: '1 cápsula pela manhã', categoria: 'Metabolismo', mecanismo: 'Estimulante lipolítico via receptores beta-3' },
  { ativo: 'Beanblock (Extrato de Feijão Branco)', dosagemSugerida: '100mg', posologia: 'Antes de refeições ricas em carboidratos', categoria: 'Metabolismo', mecanismo: 'Inibição da alfa-amilase e absorção de amido' },
  { ativo: 'Insea 2 (Bloqueador de Carboidratos)', dosagemSugerida: '250mg', posologia: '30 min antes do almoço', categoria: 'Metabolismo', mecanismo: 'Inibição da alfa-glucosidase e alfa-amilase' },
  { ativo: 'Chitosan (Quitosana)', dosagemSugerida: '1g', posologia: 'Antes de refeições gordurosas com bastante água', categoria: 'Metabolismo', mecanismo: 'Quelação de gorduras no trato digestivo' },

  // SAÚDE MENTAL, SONO & NOOTRÓPICOS (49 - 65)
  { ativo: 'Ashwagandha (KSM-66)', dosagemSugerida: '300mg', posologia: '1 cápsula 1h antes de dormir', categoria: 'Sono & Estresse', mecanismo: 'Modulação do cortisol e ansiedade' },
  { ativo: 'Magnésio Inositol / Dimalato', dosagemSugerida: '250mg', posologia: '1 cápsula à noite', categoria: 'Sono & Estresse', mecanismo: 'Relaxamento muscular e neuroproteção' },
  { ativo: 'Passiflora Incarnata', dosagemSugerida: '300mg', posologia: '1 cápsula no final da tarde', categoria: 'Sono & Estresse', mecanismo: 'Indução ao relaxamento' },
  { ativo: 'L-Teanina', dosagemSugerida: '200mg', posologia: '1 cápsula pela manhã ou no café', categoria: 'Sono & Estresse', mecanismo: 'Foco calmo via ondas alfa cerebrais' },
  { ativo: 'Melatonina Microdosada', dosagemSugerida: '0.21mg', posologia: '30 min antes de deitar', categoria: 'Sono & Estresse', mecanismo: 'Sinalização do ritmo circadiano' },
  { ativo: 'Relora', dosagemSugerida: '250mg', posologia: '2x ao dia (almoço e jantar)', categoria: 'Sono & Estresse', mecanismo: 'Redução do estresse e ansiedade' },
  { ativo: 'Rhodiola Rosea', dosagemSugerida: '200mg', posologia: '1 cápsula pela manhã', categoria: 'Performance Mental', mecanismo: 'Adaptógeno contra fadiga mental' },
  { ativo: 'Coenzima Q10 (Ubiquinol)', dosagemSugerida: '100mg', posologia: '1 cápsula junto ao almoço', categoria: 'Performance Mental', mecanismo: 'Energia mitocondrial (ATP)' },
  { ativo: 'Ginkgo Biloba', dosagemSugerida: '120mg', posologia: '1 cápsula pela manhã', categoria: 'Performance Mental', mecanismo: 'Microcirculação cerebral' },
  { ativo: 'Alpha GPC', dosagemSugerida: '300mg', posologia: '1 cápsula pela manhã', categoria: 'Performance Mental', mecanismo: 'Precursor de acetilcolina' },
  { ativo: 'Phosphatidylserine (Fosfatidilserina)', dosagemSugerida: '100mg', posologia: '1 cápsula à noite', categoria: 'Performance Mental', mecanismo: 'Suporte à memória e redução de cortisol' },
  { ativo: 'Bacopa Monnieri', dosagemSugerida: '150mg', posologia: '1 cápsula no almoço', categoria: 'Performance Mental', mecanismo: 'Retenção de memória e neuroproteção' },
  { ativo: 'Lion’s Mane (Hericium erinaceus)', dosagemSugerida: '500mg', posologia: '1 cápsula pela manhã', categoria: 'Performance Mental', mecanismo: 'Estímulo do Fator de Crescimento Nervoso (NGF)' },
  { ativo: 'GABA (Ácido Gama-Aminobutírico)', dosagemSugerida: '400mg', posologia: '1 cápsula à noite', categoria: 'Sono & Estresse', mecanismo: 'Neurotransmissor inibitório' },
  { ativo: 'Mulungu (Extrato Seco)', dosagemSugerida: '200mg', posologia: '1 cápsula à noite', categoria: 'Sono & Estresse', mecanismo: 'Ação sedativa leve e anxiolítica' },
  { ativo: 'Valeriana Officinalis', dosagemSugerida: '100mg', posologia: '1 cápsula antes de deitar', categoria: 'Sono & Estresse', mecanismo: 'Melhora da latência do sono' },
  { ativo: 'Saffron (Extrato de Açafrão / Zaffaran)', dosagemSugerida: '15mg', posologia: '2x ao dia', categoria: 'Sono & Estresse', mecanismo: 'Inibição da recaptação de serotonina' },

  // SAÚDE INTESTINAL, PROBIÓTICOS & ENZIMAS (66 - 80)
  { ativo: 'L-Glutamina', dosagemSugerida: '5g', posologia: 'Diluir em água em jejum', categoria: 'Saúde Intestinal', mecanismo: 'Integridade da barreira intestinal' },
  { ativo: 'Mix Probiótico (5 a 10 Bilhões UFC)', dosagemSugerida: '1 cap', posologia: '1 cápsula ao deitar', categoria: 'Saúde Intestinal', mecanismo: 'Reequilíbrio da microbiota' },
  { ativo: 'Lactobacillus Rhamnosus GG', dosagemSugerida: '2 Bilhões UFC', posologia: '1 cápsula ao dia', categoria: 'Saúde Intestinal', mecanismo: 'Imunidade intestinal e alergias' },
  { ativo: 'Lactobacillus Acidophilus', dosagemSugerida: '2 Bilhões UFC', posologia: '1 cápsula ao dia', categoria: 'Saúde Intestinal', mecanismo: 'Melhora da digestão de lactose' },
  { ativo: 'Bifidobacterium Lactis', dosagemSugerida: '2 Bilhões UFC', posologia: '1 cápsula ao dia', categoria: 'Saúde Intestinal', mecanismo: 'Trânsito intestinal e constipação' },
  { ativo: 'Enzimas Digestivas Completa', dosagemSugerida: '1 cap', posologia: 'Antes das refeições principais', categoria: 'Saúde Intestinal', mecanismo: 'Digestão de proteínas, gorduras e amido' },
  { ativo: 'Lactase (Enzima)', dosagemSugerida: '10.000 ALU', posologia: 'Antes de consumir laticínios', categoria: 'Saúde Intestinal', mecanismo: 'Hidrólise da lactose' },
  { ativo: 'Saccharomyces boulardii', dosagemSugerida: '200mg', posologia: '2x ao dia', categoria: 'Saúde Intestinal', mecanismo: 'Probiótico contra diarreia' },
  { ativo: 'Sunfiber (Goma Guar Hidrolisada)', dosagemSugerida: '5g', posologia: 'Diluir em água', categoria: 'Saúde Intestinal', mecanismo: 'Fibra prebiótica de baixa fermentação' },
  { ativo: 'FOS (Frutooligossacarídeo)', dosagemSugerida: '3g', posologia: 'Junto a sucos ou água', categoria: 'Saúde Intestinal', mecanismo: 'Alimento para bifidobactérias' },
  { ativo: 'Inulina', dosagemSugerida: '5g', posologia: 'Misturado em alimentos', categoria: 'Saúde Intestinal', mecanismo: 'Produção de Ácidos Graxos de Cadeia Curtal' },
  { ativo: 'Betaína HCL', dosagemSugerida: '300mg', posologia: 'No início de refeições proteicas', categoria: 'Saúde Intestinal', mecanismo: 'Acidificação gástrica e digestão' },
  { ativo: 'Tributirina (CoreBiome)', dosagemSugerida: '300mg', posologia: '1 cápsula ao dia', categoria: 'Saúde Intestinal', mecanismo: 'Butirato direto para colonócitos' },
  { ativo: 'Bromelaina', dosagemSugerida: '150mg', posologia: 'Após refeições pesadas', categoria: 'Saúde Intestinal', mecanismo: 'Enzima proteolítica do abacaxi' },
  { ativo: 'Papaína', dosagemSugerida: '100mg', posologia: 'Após refeições com carne', categoria: 'Saúde Intestinal', mecanismo: 'Digestão de proteínas' },

  // FITOTERÁPICOS, ADAPTÓGENOS & ANTI-INFLAMATÓRIOS (81 - 92)
  { ativo: 'Curcumina Padronizada (95% Curcuminoides)', dosagemSugerida: '500mg', posologia: '1 cápsula no almoço com pimenta preta', categoria: 'Fitoterápicos', mecanismo: 'Anti-inflamatório sistêmico' },
  { ativo: 'Piperina (Extrato de Pimenta Preta)', dosagemSugerida: '5mg', posologia: 'Associado à Curcumina', categoria: 'Fitoterápicos', mecanismo: 'Aumento da biodisponibilidade' },
  { ativo: 'Boswellia Serrata', dosagemSugerida: '300mg', posologia: '1 cápsula 2x ao dia', categoria: 'Fitoterápicos', mecanismo: 'Saúde articular e anti-inflamatório' },
  { ativo: 'UC-II (Colágeno Tipo II Não Denaturado)', dosagemSugerida: '40mg', posologia: '1 cápsula em jejum', categoria: 'Fitoterápicos', mecanismo: 'Dessensibilização imunológica em articulações' },
  { ativo: 'Garra do Diabo (Harpagophytum)', dosagemSugerida: '400mg', posologia: '1 cápsula após almoço', categoria: 'Fitoterápicos', mecanismo: 'Analgesia e inflamação articular' },
  { ativo: 'Moringa Oleifera', dosagemSugerida: '500mg', posologia: '1 cápsula pela manhã', categoria: 'Fitoterápicos', mecanismo: 'Aporte de fitoquímicos e antioxidantes' },
  { ativo: 'Echinacea Purpurea', dosagemSugerida: '300mg', posologia: '1 cápsula 2x ao dia no inverno', categoria: 'Fitoterápicos', mecanismo: 'Imunomodulação de vias aéreas' },
  { ativo: 'Uncaria Tomentosa (Unha de Gato)', dosagemSugerida: '250mg', posologia: '1 cápsula ao dia', categoria: 'Fitoterápicos', mecanismo: 'Ação imunoestimulante' },
  { ativo: 'Silimarina (Cardo Mariano)', dosagemSugerida: '200mg', posologia: '1 cápsula no almoço', categoria: 'Fitoterápicos', mecanismo: 'Hepatoproteção e regeneração hepática' },
  { ativo: 'Alcachofra (Extrato Seco)', dosagemSugerida: '300mg', posologia: 'Antes do almoço', categoria: 'Fitoterápicos', mecanismo: 'Estímulo do fluxo biliar' },
  { ativo: 'Dente de Leão (Taraxacum)', dosagemSugerida: '250mg', posologia: '1 cápsula à tarde', categoria: 'Fitoterápicos', mecanismo: 'Diurético natural e depurativo' },
  { ativo: 'Cranberry (Extrato Padronizado)', dosagemSugerida: '500mg', posologia: '1 cápsula ao dia com água', categoria: 'Fitoterápicos', mecanismo: 'Prevenção de infecção urinária (E. coli)' },

  // VITAMINAS, MINERAIS & MICRONUTRIENTES QUELADOS (93 - 105)
  { ativo: 'Zinco Quelato', dosagemSugerida: '15mg a 30mg', posologia: '1 cápsula no jantar', categoria: 'Imunidade', mecanismo: 'Cofator imunológico' },
  { ativo: 'Vitamina D3 + K2 (MK-7)', dosagemSugerida: '2000 UI + 50mcg', posologia: '1 cápsula no almoço', categoria: 'Imunidade', mecanismo: 'Fixação de cálcio e imunidade' },
  { ativo: 'Vitamina C Tamponada', dosagemSugerida: '500mg', posologia: '1 cápsula no café', categoria: 'Imunidade', mecanismo: 'Antioxidante sem acidez gástrica' },
  { ativo: 'Complexo B Ativo (Metilfolato + Metilcobalamina)', dosagemSugerida: '1 cap', posologia: '1 cápsula pela manhã', categoria: 'Imunidade', mecanismo: 'Metilação e neuroproteção' },
  { ativo: 'Ferro Bisglicinato', dosagemSugerida: '30mg', posologia: '1 cápsula em jejum', categoria: 'Imunidade', mecanismo: 'Tratamento da anemia sem constipação' },
  { ativo: 'Omega 3 (EPA 360mg / DHA 240mg)', dosagemSugerida: '1000mg', posologia: '1 cápsula 2x ao dia nas refeições', categoria: 'Imunidade', mecanismo: 'Modulação de citocinas inflamatórias' },
  { ativo: 'Magnésio Treonato', dosagemSugerida: '200mg', posologia: '1 cápsula à noite', categoria: 'Imunidade', mecanismo: 'Magnésio de alta penetração no SNC' },
  { ativo: 'Magnésio Taurato', dosagemSugerida: '150mg', posologia: '1 cápsula pela manhã', categoria: 'Imunidade', mecanismo: 'Saúde cardiovascular e pressão arterial' },
  { ativo: 'Cobre Quelato', dosagemSugerida: '1mg a 2mg', posologia: 'Junto com o Zinco', categoria: 'Imunidade', mecanismo: 'Balanço da enzima SOD' },
  { ativo: 'Selênio Quelato (Selenometionina)', dosagemSugerida: '100mcg', posologia: '1 cápsula no almoço', categoria: 'Imunidade', mecanismo: 'Suporte à tireoide (conversão T4 em T3)' },
  { ativo: 'Manganês Quelato', dosagemSugerida: '2mg', posologia: '1 cápsula ao dia', categoria: 'Imunidade', mecanismo: 'Cofator da enzima SOD mitocondrial' },
  { ativo: 'Boro Quelato', dosagemSugerida: '3mg', posologia: '1 cápsula no jantar', categoria: 'Imunidade', mecanismo: 'Modulação hormonal e densidade óssea' },
  { ativo: 'Vitamina E (D-Alfa-Tocoferol)', dosagemSugerida: '400 UI', posologia: '1 cápsula no almoço', categoria: 'Imunidade', mecanismo: 'Proteção lipídica de membrana' },
];

const FORMULAS_PADRAO: FormulaPronta[] = [
  {
    id: 'f1',
    titulo: 'Fórmula para Indução ao Sono e Redução do Estresse',
    categoria: 'SAÚDE MENTAL & SONO',
    descricao: 'Aumento dos níveis de GABA, modulação do cortisol noturno e melhora do sono REM.',
    icone: '🌙',
    ativos: [
      { id: 'a1', ativo: 'Magnésio Inositol / Dimalato', dosagem: '250mg', posologia: '1 cápsula à noite', mecanismo: 'Neuroproteção e relaxamento muscular' },
      { id: 'a2', ativo: 'Ashwagandha (KSM-66)', dosagem: '300mg', posologia: '1 cápsula à noite', mecanismo: 'Modulação do cortisol' },
    ],
  },
  {
    id: 'f2',
    titulo: 'Fórmula Nutricosmética (Cabelo, Unhas & Pele)',
    categoria: 'ESTÉTICA & NUTRACÊUTICOS',
    descricao: 'Para eflúvio telógeno (queda capilar), unhas fracas e perda de firmeza cutânea.',
    icone: '💆‍♀️',
    ativos: [
      { id: 'a4', ativo: 'Silício Orgânico (Nutricolin/Exsynutriment)', dosagem: '100mg', posologia: '1 cápsula ao dia', mecanismo: 'Estímulo da síntese de colágeno e queratina' },
      { id: 'a5', ativo: 'Biotina (Vitamina B7)', dosagem: '2.5mg', posologia: '1 cápsula no almoço', mecanismo: 'Fortalecimento da matriz capilar' },
      { id: 'a6', ativo: 'Zinco Quelato', dosagem: '15mg', posologia: '1 cápsula no jantar', mecanismo: 'Cofator para proliferação celular' },
    ],
  },
  {
    id: 'f3',
    titulo: 'Modulador de Apetite e Compulsão por Doces',
    categoria: 'METABOLISMO & APETITE',
    descricao: 'Melhora da sensibilidade à insulina e redução da fissura por carboidratos.',
    icone: '🍫',
    ativos: [
      { id: 'a8', ativo: 'Picolinato de Cromo', dosagem: '250mcg', posologia: '1 cápsula às 15h', mecanismo: 'Potencialização da ação da insulina' },
    ],
  },
];

export default function SuplementacaoPage() {
  const [formulas, setFormulas] = useState<FormulaPronta[]>(FORMULAS_PADRAO);
  const [formulaAtiva, setFormulaAtiva] = useState<FormulaPronta>(FORMULAS_PADRAO[1]);

  const profissionalNome = 'Dra. Luana Santos';
  const profissionalCRN = 'CRN-4 12345/RJ';
  const pacienteNome = 'Ana Silva';

  const [modoManual, setModoManual] = useState(false);
  const [ativoSelecionadoBanco, setAtivoSelecionadoBanco] = useState('');
  const [ativoNomeCustom, setAtivoNomeCustom] = useState('');
  const [dosagemInput, setDosagemInput] = useState('');
  const [posologiaInput, setPosologiaInput] = useState('');
  const [mecanismoInput, setMecanismoInput] = useState('');

  const handleSelecionarAtivoBanco = (nomeAtivo: string) => {
    setAtivoSelecionadoBanco(nomeAtivo);
    const itemEncontrado = BANCO_DE_DADOS_ATIVOS.find((b) => b.ativo === nomeAtivo);
    if (itemEncontrado) {
      setDosagemInput(itemEncontrado.dosagemSugerida);
      setPosologiaInput(itemEncontrado.posologia);
      setMecanismoInput(itemEncontrado.mecanismo);
    }
  };

  const handleAdicionarAtivo = (e: React.FormEvent) => {
    e.preventDefault();
    const nomeFinal = modoManual ? ativoNomeCustom : ativoSelecionadoBanco;
    if (!nomeFinal.trim()) return;

    const novoAtivo: AtivoItem = {
      id: `a_${Date.now()}`,
      ativo: nomeFinal,
      dosagem: dosagemInput || 'A definir',
      posologia: posologiaInput || '1x ao dia',
      mecanismo: mecanismoInput || 'Uso individualizado',
    };

    const novaListaAtivos = [...formulaAtiva.ativos, novoAtivo];
    const formulaAtualizada = { ...formulaAtiva, ativos: novaListaAtivos };

    setFormulaAtiva(formulaAtualizada);
    setFormulas((prev) => prev.map((f) => (f.id === formulaAtiva.id ? formulaAtualizada : f)));

    setAtivoSelecionadoBanco('');
    setAtivoNomeCustom('');
    setDosagemInput('');
    setPosologiaInput('');
    setMecanismoInput('');
  };

  const removerAtivo = (idAtivo: string) => {
    const novaLista = formulaAtiva.ativos.filter((a) => a.id !== idAtivo);
    const formulaAtualizada = { ...formulaAtiva, ativos: novaLista };
    setFormulaAtiva(formulaAtualizada);
    setFormulas((prev) => prev.map((f) => (f.id === formulaAtiva.id ? formulaAtualizada : f)));
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="min-h-screen p-6 md:p-8 transition-colors duration-200 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      
      {/* 1. CONTEÚDO DE TELA */}
      <div className="print:hidden space-y-8">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 dark:border-gray-800 pb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span>💊</span> Guia de Suplementação & Manipulados
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Prescrição e manipulação nutraciêutica com dosagens personalizadas.
            </p>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400">
            Paciente em Atendimento: <strong>{pacienteNome}</strong>
          </div>
        </div>

        {/* Modelos Rápidos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {formulas.map((item) => {
            const selecionado = item.id === formulaAtiva.id;
            return (
              <button
                key={item.id}
                onClick={() => setFormulaAtiva(item)}
                className={`p-4 rounded-xl border text-left transition duration-200 flex flex-col justify-between gap-2 ${
                  selecionado
                    ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                }`}
              >
                <span className="text-2xl">{item.icone}</span>
                <div>
                  <p className="font-bold text-xs text-gray-900 dark:text-white">{item.titulo}</p>
                  <span className="text-[9px] font-bold text-gray-400 uppercase">{item.categoria}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Painel da Prescrição */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {formulaAtiva.categoria}
              </span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>{formulaAtiva.icone}</span> {formulaAtiva.titulo}
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleImprimir}
                className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2"
              >
                <span>🖨️</span> Imprimir
              </button>
              <button
                onClick={handleImprimir}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-md"
              >
                <span>📥</span> Gerar PDF
              </button>
            </div>
          </div>

          {/* Tabela Interativa de Tela */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 uppercase font-semibold">
                  <th className="py-3 px-4">Ativo</th>
                  <th className="py-3 px-4">Dosagem</th>
                  <th className="py-3 px-4">Posologia</th>
                  <th className="py-3 px-4">Ação</th>
                  <th className="py-3 px-4 text-right">Remover</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {formulaAtiva.ativos.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{item.ativo}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 font-mono">{item.dosagem}</td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{item.posologia}</td>
                    <td className="py-3.5 px-4 text-gray-500">{item.mecanismo}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => removerAtivo(item.id)} className="text-rose-500 font-bold">✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Formulário de Adicionar Ativo */}
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
              <h3 className="font-bold text-xs uppercase text-emerald-600 dark:text-emerald-400">
                ➕ Adicionar Mais Ativos à Prescrição
              </h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setModoManual(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${!modoManual ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                >
                  Banco de Dados ({BANCO_DE_DADOS_ATIVOS.length} Ativos)
                </button>
                <button
                  type="button"
                  onClick={() => setModoManual(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${modoManual ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                >
                  Cadastrar Manual
                </button>
              </div>
            </div>

            <form onSubmit={handleAdicionarAtivo} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Ativo</label>
                  {modoManual ? (
                    <input
                      type="text"
                      required
                      placeholder="Ex: Coenzima Q10"
                      value={ativoNomeCustom}
                      onChange={(e) => setAtivoNomeCustom(e.target.value)}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 font-bold"
                    />
                  ) : (
                    <select
                      value={ativoSelecionadoBanco}
                      onChange={(e) => handleSelecionarAtivoBanco(e.target.value)}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 font-bold"
                    >
                      <option value="">-- Selecione do Banco ({BANCO_DE_DADOS_ATIVOS.length} ativos) --</option>
                      {BANCO_DE_DADOS_ATIVOS.map((b, idx) => (
                        <option key={idx} value={b.ativo}>[{b.categoria}] {b.ativo}</option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block font-semibold mb-1">Dosagem</label>
                  <input
                    type="text"
                    placeholder="Ex: 200mg"
                    value={dosagemInput}
                    onChange={(e) => setDosagemInput(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Posologia</label>
                  <input
                    type="text"
                    placeholder="Ex: Tomar 1x ao dia"
                    value={posologiaInput}
                    onChange={(e) => setPosologiaInput(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-lg">
                  Inserir Ativo na Receita
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* 2. FOLHA DE RECEITUÁRIO EXCLUSIVA PARA IMPRESSÃO/PDF */}
      <div className="hidden print:block text-black bg-white p-8 font-sans max-w-2xl mx-auto space-y-6">
        
        {/* Cabeçalho Timbrado */}
        <div className="border-b-2 border-emerald-600 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-xl font-bold text-emerald-800 uppercase tracking-wide">{profissionalNome}</h1>
            <p className="text-xs font-semibold text-gray-600">{profissionalCRN} • Nutrição Clínica & Funcional</p>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p>Data: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </div>

        {/* Identificação do Paciente */}
        <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-xs space-y-1">
          <p><strong>Paciente:</strong> {pacienteNome}</p>
          <p><strong>Prescrição:</strong> {formulaAtiva.titulo}</p>
        </div>

        {/* Tabela de Manipulados / Suplementação */}
        <div className="space-y-2 pt-2">
          <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider border-b border-gray-300 pb-1">
            Fórmula Manipulada / Plano de Suplementação
          </h2>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-300 font-bold text-gray-700">
                <th className="py-2">Componente / Ativo</th>
                <th className="py-2">Dosagem</th>
                <th className="py-2">Modo de Uso / Posologia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {formulaAtiva.ativos.map((item) => (
                <tr key={item.id}>
                  <td className="py-2.5 font-bold">{item.ativo}</td>
                  <td className="py-2.5 font-bold text-emerald-700">{item.dosagem}</td>
                  <td className="py-2.5">{item.posologia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Observações de Manipulação */}
        <div className="pt-4 text-[11px] text-gray-600 space-y-1 border-t border-gray-200">
          <p><strong>Observações para a Farmácia de Manipulação:</strong></p>
          <p>• Aviar em cápsulas vegetais (sem corantes artificiais).</p>
          <p>• Validade sugerida: 60 dias.</p>
        </div>

        {/* Campo de Assinatura */}
        <div className="pt-16 text-center space-y-1">
          <div className="w-64 mx-auto border-t border-black" />
          <p className="font-bold text-xs">{profissionalNome}</p>
          <p className="text-[10px] text-gray-500">{profissionalCRN}</p>
        </div>

      </div>

    </div>
  );
}