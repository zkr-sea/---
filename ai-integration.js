// AI集成模块 - 伴学反馈智能分析
class AIFeedbackAnalyzer {
    constructor() {
        this.apiKey = ''; // 需要配置API密钥
        this.baseUrl = 'https://api.openai.com/v1/chat/completions'; // 示例API端点
    }

    // 配置API密钥
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    // 生成个性化学习建议
    async generatePersonalizedSuggestion(studentData, feedbackHistory) {
        try {
            const prompt = this.buildAnalysisPrompt(studentData, feedbackHistory);
            
            // 模拟AI API调用
            const response = await this.callAIAPI(prompt);
            
            return {
                success: true,
                suggestion: response.suggestion,
                analysis: response.analysis,
                nextSteps: response.nextSteps
            };
        } catch (error) {
            console.error('AI分析失败:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // 基于学习内容生成反馈
    async generateFeedbackWithContent(studentData, feedbackHistory) {
        try {
            const prompt = this.buildFeedbackPrompt(studentData, feedbackHistory);
            
            // 模拟AI API调用
            const response = await this.callFeedbackAPI(prompt);
            
            return {
                success: true,
                content: response.content,
                progress: response.progress,
                nextSteps: response.nextSteps
            };
        } catch (error) {
            console.error('AI反馈生成失败:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // 构建分析提示词
    buildAnalysisPrompt(studentData, feedbackHistory) {
        const { name, subject, grade, type } = studentData;
        
        let prompt = `作为一位专业的教育AI助手，请基于以下学生信息提供个性化的学习建议：

学生信息：
- 姓名：${name}
- 科目：${subject}
- 年级：${grade}
- 类型：${type === 'trial' ? '试课学员' : '正式学员'}

历史反馈记录：
${feedbackHistory.map(feedback => `
- 日期：${feedback.date}
- 评分：${feedback.rating}/5
- 学习情况：${feedback.content}
- 学习进度：${feedback.progress || '无'}
- 下一步计划：${feedback.nextSteps || '无'}
`).join('\n')}

请提供：
1. 学习情况分析
2. 个性化学习建议
3. 具体改进措施
4. 下一步学习计划

请用中文回答，内容要具体、实用、针对性强。`;

        return prompt;
    }

    // 构建反馈提示词
    buildFeedbackPrompt(studentData, feedbackHistory) {
        const { name, subject, grade, type, learningContent } = studentData;
        
        let prompt = `作为一位专业的教育AI助手，请基于以下信息生成学习反馈：

学生信息：
- 姓名：${name}
- 科目：${subject}
- 年级：${grade}
- 类型：${type === 'trial' ? '试课学员' : '正式学员'}

今天学习的内容：${learningContent}

历史反馈记录：
${feedbackHistory.map(feedback => `
- 日期：${feedback.date}
- 学习内容：${feedback.learningContent || '无'}
- 学习情况：${feedback.content || '无'}
- 学习进度：${feedback.progress || '无'}
`).join('\n')}

请生成以下三个部分的反馈：

1. 学习情况（包含学习收获）：
   - 分析学生对今天学习内容的掌握情况
   - 指出学生的优点和进步
   - 描述具体的学习收获

2. 学习进度：
   - 总结当前的学习进度
   - 与之前的学习进行对比
   - 评估学习效果

3. 下一步计划：
   - 基于今天的学习内容提出改进建议
   - 制定下一步的学习计划
   - 对孩子的鼓励和期望

请用中文回答，内容要具体、积极、鼓励性强，适合家长阅读。`;

        return prompt;
    }

    // 调用AI API（示例实现）
    async callAIAPI(prompt) {
        // 这里是模拟的API调用，实际使用时需要替换为真实的AI API
        return new Promise((resolve) => {
            setTimeout(() => {
                // 模拟AI响应
                const responses = {
                    '数学': {
                        suggestion: '基于学生的学习历史，建议重点加强应用题解题能力，可以通过以下方式：1. 每天练习2-3道应用题；2. 建立错题本，定期复习；3. 学习解题思路和方法。',
                        analysis: '学生在基础概念掌握良好，但在实际应用方面需要加强。',
                        nextSteps: '建议制定每周学习计划，重点练习应用题，准备期中考试。'
                    },
                    '英语': {
                        suggestion: '建议增加词汇量训练和听力练习，具体措施：1. 每天背诵15个新单词；2. 听英语音频30分钟；3. 练习英语写作。',
                        analysis: '学生英语基础扎实，需要提升实际应用能力。',
                        nextSteps: '制定词汇学习计划，增加听说练习时间。'
                    },
                    '语文': {
                        suggestion: '建议多读经典文学作品，提升阅读理解能力：1. 每周阅读一篇经典文章；2. 练习写作技巧；3. 背诵古诗词。',
                        analysis: '学生语文素养良好，需要加强阅读和写作训练。',
                        nextSteps: '建立阅读计划，每周写一篇作文。'
                    },
                    '物理': {
                        suggestion: '建议多做实验题和计算题：1. 理解物理概念的实际应用；2. 练习计算题，提升解题速度；3. 整理公式，建立知识体系。',
                        analysis: '学生物理基础概念清晰，需要加强实际应用能力。',
                        nextSteps: '制定实验题专项训练计划。'
                    }
                };

                const subject = prompt.includes('数学') ? '数学' : 
                              prompt.includes('英语') ? '英语' : 
                              prompt.includes('语文') ? '语文' : 
                              prompt.includes('物理') ? '物理' : '数学';

                resolve(responses[subject] || responses['数学']);
            }, 1500);
        });
    }

    // 调用反馈API（示例实现）
    async callFeedbackAPI(prompt) {
        // 这里是模拟的API调用，实际使用时需要替换为真实的AI API
        return new Promise((resolve) => {
            setTimeout(() => {
                // 从提示词中提取学习内容
                const learningContentMatch = prompt.match(/今天学习的内容：([^\n]+)/);
                const learningContent = learningContentMatch ? learningContentMatch[1] : '';
                
                // 从提示词中提取学生姓名
                const studentNameMatch = prompt.match(/姓名：([^\n]+)/);
                const studentName = studentNameMatch ? studentNameMatch[1] : '同学';
                
                // 根据学习内容生成个性化反馈
                const response = this.generatePersonalizedFeedback(learningContent, studentName);
                
                resolve(response);
            }, 2000);
        });
    }

    // 根据学习内容生成个性化反馈
    generatePersonalizedFeedback(learningContent, studentName) {
        // 分析学习内容关键词
        const keywords = this.extractKeywords(learningContent);
        const subject = this.detectSubject(learningContent);
        
        // 根据学习内容生成相应的反馈
        let content = `今天我们学习了${learningContent}。`;
        let progress = '';
        let nextSteps = '';
        
        // 根据科目和学习内容生成具体反馈
        if (subject === '数学') {
            if (keywords.includes('函数') || keywords.includes('二次函数')) {
                content += `${studentName}同学在理解函数概念方面表现很好，能够准确识别函数的基本特征。在解题过程中，学生展现了良好的逻辑思维能力，能够运用所学知识解决实际问题。通过今天的练习，学生掌握了函数的基本性质，为后续学习打下了坚实基础。`;
                progress = `相比之前的学习，${studentName}在函数概念的理解上有了明显进步，从基础概念到实际应用的过渡非常顺利。学生能够主动思考问题，在遇到困难时也会积极寻求解决方法。整体学习进度符合预期，为下一阶段的学习做好了准备。`;
                nextSteps = `建议继续巩固函数知识的应用，可以多练习一些实际应用题。同时，可以开始预习更复杂的函数类型，为后续学习做好准备。${studentName}同学的学习态度很好，相信通过持续努力，一定能在数学学习上取得更大进步！`;
            } else if (keywords.includes('方程') || keywords.includes('解方程')) {
                content += `${studentName}同学在解方程方面表现突出，能够熟练运用各种解方程的方法。在解题过程中，学生展现了良好的计算能力和逻辑思维，能够准确找到解题思路。通过今天的练习，学生掌握了方程求解的基本技巧，为数学学习打下了良好基础。`;
                progress = `${studentName}在方程求解方面一直保持稳定的进步，解题速度和准确性都在不断提升。相比之前，学生在面对复杂方程时更加自信，敢于尝试不同的解题方法。`;
                nextSteps = `建议继续练习不同类型的方程，可以尝试一些应用题中的方程问题。同时，可以开始学习方程组的解法，为后续学习做好准备。${studentName}同学的数学思维很好，相信通过持续努力，一定能在数学学习上取得优异成绩！`;
            } else if (keywords.includes('几何') || keywords.includes('图形')) {
                content += `${studentName}同学在几何学习方面表现很好，能够准确理解几何概念和性质。在解题过程中，学生展现了良好的空间思维能力，能够运用几何知识解决实际问题。通过今天的练习，学生掌握了几何的基本原理，为数学学习增添了新的维度。`;
                progress = `${studentName}在几何学习方面一直保持浓厚的兴趣，空间想象能力在不断提升。相比之前，学生在几何证明方面更加熟练，能够从多个角度分析几何问题。`;
                nextSteps = `建议继续练习几何证明题，可以尝试一些复杂的几何问题。同时，可以开始学习立体几何，为后续学习做好准备。${studentName}同学的几何思维很好，相信通过持续努力，一定能在数学学习上取得更大成就！`;
            } else {
                content += `${studentName}同学在数学学习方面表现很好，能够准确理解所学概念。在解题过程中，学生展现了良好的逻辑思维能力，能够运用所学知识解决实际问题。通过今天的练习，学生掌握了相关知识点，为数学学习打下了坚实基础。`;
                progress = `相比之前的学习，${studentName}在数学概念的理解上有了明显进步，学习能力在不断提升。学生能够主动思考问题，在遇到困难时也会积极寻求解决方法。`;
                nextSteps = `建议继续巩固所学知识，可以多练习一些相关题目。同时，可以开始预习下一个知识点，为后续学习做好准备。${studentName}同学的学习态度很好，相信通过持续努力，一定能在数学学习上取得更大进步！`;
            }
        } else if (subject === '英语') {
            if (keywords.includes('语法') || keywords.includes('时态')) {
                content += `${studentName}同学在英语语法学习方面表现突出，能够正确理解语法规则。在练习过程中，学生展现了良好的语言感知能力，能够准确运用语法知识。通过今天的学习，学生掌握了相关语法规则，为英语学习打下了良好基础。`;
                progress = `${studentName}在英语语法方面一直保持稳定的进步，语法理解能力在不断提升。相比之前，学生在语法运用方面更加自信，敢于尝试复杂的语法结构。`;
                nextSteps = `建议继续练习语法应用，可以多做一些语法练习题。同时，可以开始学习更复杂的语法结构，为后续学习做好准备。${studentName}同学的英语学习潜力很大，相信通过持续努力，一定能在英语学习上取得优异成绩！`;
            } else if (keywords.includes('词汇') || keywords.includes('单词')) {
                content += `${studentName}同学在词汇学习方面表现很好，能够快速记忆和运用新单词。在练习过程中，学生展现了良好的记忆能力，能够准确理解词汇的含义和用法。通过今天的学习，学生掌握了相关词汇，为英语学习打下了坚实基础。`;
                progress = `${studentName}在词汇量方面一直保持稳定的增长，词汇运用能力在不断提升。相比之前，学生在词汇表达方面更加丰富，敢于使用新学到的词汇。`;
                nextSteps = `建议继续扩大词汇量，每天背诵10-15个新单词。同时，可以多练习词汇的应用，为后续学习做好准备。${studentName}同学的英语学习态度很好，相信通过持续努力，一定能在英语学习上取得更大进步！`;
            } else if (keywords.includes('阅读') || keywords.includes('理解')) {
                content += `${studentName}同学在英语阅读理解方面表现很好，能够准确理解文章内容。在阅读过程中，学生展现了良好的理解能力，能够把握文章的主要意思和细节。通过今天的学习，学生掌握了阅读技巧，为英语学习增添了新的维度。`;
                progress = `${studentName}在英语阅读方面一直保持浓厚的兴趣，阅读理解能力在不断提升。相比之前，学生在阅读速度方面有了明显提高，能够更快速地理解文章内容。`;
                nextSteps = `建议继续练习阅读理解，可以多读一些英语文章。同时，可以开始练习英语写作，为后续学习做好准备。${studentName}同学的英语学习潜力很大，相信通过持续努力，一定能在英语学习上取得更大成就！`;
            } else {
                content += `${studentName}同学在英语学习方面表现很好，能够准确理解所学内容。在练习过程中，学生展现了良好的语言能力，能够运用所学知识进行表达。通过今天的学习，学生掌握了相关知识点，为英语学习打下了坚实基础。`;
                progress = `${studentName}在英语学习方面一直保持稳定的进步，语言运用能力在不断提升。相比之前，学生在英语表达方面更加自信，敢于开口说英语。`;
                nextSteps = `建议继续练习英语应用，可以多听英语音频，提升听力理解能力。同时，可以练习英语写作，为后续学习做好准备。${studentName}同学的英语学习态度很好，相信通过持续努力，一定能在英语学习上取得更大进步！`;
            }
        } else if (subject === '语文') {
            if (keywords.includes('古诗') || keywords.includes('诗词')) {
                content += `${studentName}同学在古诗词学习方面表现很好，能够准确理解诗歌的意境和表达技巧。在朗读过程中，学生语调优美，情感丰富，展现了良好的文学素养。通过今天的学习，学生掌握了诗歌鉴赏的基本方法，为语文学习增添了新的维度。`;
                progress = `${studentName}在古诗词学习方面一直保持浓厚的兴趣，文学鉴赏能力在不断提升。相比之前，学生在诗歌理解方面更加深入，能够从多个角度欣赏诗歌。`;
                nextSteps = `建议继续背诵古诗词，可以多读一些经典诗歌。同时，可以练习诗歌创作，为后续学习做好准备。${studentName}同学的文学天赋很好，相信通过持续努力，一定能在语文学习上取得更大成就！`;
            } else if (keywords.includes('阅读') || keywords.includes('理解')) {
                content += `${studentName}同学在阅读理解方面表现很好，能够准确理解文章内容和中心思想。在阅读过程中，学生展现了良好的理解能力，能够把握文章的层次结构和写作技巧。通过今天的学习，学生掌握了阅读技巧，为语文学习打下了坚实基础。`;
                progress = `${studentName}在阅读理解方面一直保持稳定的进步，理解能力在不断提升。相比之前，学生在阅读速度方面有了明显提高，能够更快速地理解文章内容。`;
                nextSteps = `建议继续练习阅读理解，可以多读一些经典文学作品。同时，可以练习写作技巧，为后续学习做好准备。${studentName}同学的语文学习潜力很大，相信通过持续努力，一定能在语文学习上取得优异成绩！`;
            } else if (keywords.includes('写作') || keywords.includes('作文')) {
                content += `${studentName}同学在写作方面表现很好，能够运用丰富的词汇和优美的语言表达思想。在写作过程中，学生展现了良好的表达能力，能够组织清晰的文章结构。通过今天的学习，学生掌握了写作技巧，为语文学习打下了坚实基础。`;
                progress = `${studentName}在写作方面一直保持浓厚的兴趣，表达能力在不断提升。相比之前，学生在文章结构方面更加清晰，语言表达更加丰富。`;
                nextSteps = `建议继续练习写作，可以每周写一篇作文。同时，可以多读一些优秀作品，为后续学习做好准备。${studentName}同学的写作天赋很好，相信通过持续努力，一定能在语文学习上取得更大成就！`;
            } else {
                content += `${studentName}同学在语文学习方面表现很好，能够准确理解所学内容。在学习过程中，学生展现了良好的理解能力，能够运用所学知识进行表达。通过今天的学习，学生掌握了相关知识点，为语文学习打下了坚实基础。`;
                progress = `${studentName}在语文学习方面一直保持稳定的进步，理解能力在不断提升。相比之前，学生在语文表达方面更加自信，敢于尝试不同的表达方式。`;
                nextSteps = `建议继续练习语文应用，可以多读一些经典文学作品。同时，可以练习写作技巧，为后续学习做好准备。${studentName}同学的语文学习态度很好，相信通过持续努力，一定能在语文学习上取得更大进步！`;
            }
        } else if (subject === '物理') {
            if (keywords.includes('力学') || keywords.includes('运动')) {
                content += `${studentName}同学在力学学习方面表现很好，能够准确理解力的概念和运动规律。在实验操作中，学生观察仔细，记录详细，展现了良好的科学探究精神。通过今天的学习，学生掌握了力学的基本原理，为物理学习打下了坚实基础。`;
                progress = `${studentName}在物理学习方面一直保持严谨的态度，实验操作能力在不断提升。相比之前，学生在物理概念的理解上更加深入，能够运用所学知识解决实际问题。`;
                nextSteps = `建议继续巩固力学知识，可以多做一些实验题，理解物理概念的实际应用。同时，可以练习计算题，提升解题速度和准确性。${studentName}同学的科学思维很好，相信通过持续努力，一定能在物理学习上取得更大进步！`;
            } else if (keywords.includes('电学') || keywords.includes('电路')) {
                content += `${studentName}同学在电学学习方面表现很好，能够准确理解电路的基本概念和规律。在实验操作中，学生操作规范，观察仔细，展现了良好的实验技能。通过今天的学习，学生掌握了电学的基本原理，为物理学习打下了坚实基础。`;
                progress = `${studentName}在电学学习方面一直保持浓厚的兴趣，实验能力在不断提升。相比之前，学生在电路分析方面更加熟练，能够运用所学知识解决实际问题。`;
                nextSteps = `建议继续练习电路分析，可以多做一些实验题，理解电学概念的实际应用。同时，可以练习计算题，提升解题速度和准确性。${studentName}同学的科学思维很好，相信通过持续努力，一定能在物理学习上取得更大成就！`;
            } else {
                content += `${studentName}同学在物理学习方面表现很好，能够准确理解物理概念和规律。在实验操作中，学生观察仔细，记录详细，展现了良好的科学探究精神。通过今天的学习，学生掌握了相关物理原理，为物理学习打下了坚实基础。`;
                progress = `${studentName}在物理学习方面一直保持严谨的态度，实验操作能力在不断提升。相比之前，学生在物理概念的理解上更加深入，能够运用所学知识解决实际问题。`;
                nextSteps = `建议继续巩固物理知识，可以多做一些实验题，理解物理概念的实际应用。同时，可以练习计算题，提升解题速度和准确性。${studentName}同学的科学思维很好，相信通过持续努力，一定能在物理学习上取得更大进步！`;
            }
        } else {
            // 默认反馈
            content += `${studentName}同学在学习方面表现很好，能够准确理解所学内容。在学习过程中，学生展现了良好的理解能力，能够运用所学知识解决问题。通过今天的学习，学生掌握了相关知识点，为后续学习打下了坚实基础。`;
            progress = `${studentName}在学习方面一直保持稳定的进步，理解能力在不断提升。相比之前，学生在知识运用方面更加自信，敢于尝试不同的学习方法。`;
            nextSteps = `建议继续巩固所学知识，可以多练习一些相关题目。同时，可以开始预习下一个知识点，为后续学习做好准备。${studentName}同学的学习态度很好，相信通过持续努力，一定能在学习上取得更大进步！`;
        }
        
        return {
            content,
            progress,
            nextSteps
        };
    }

    // 提取关键词
    extractKeywords(text) {
        const keywords = [];
        const commonKeywords = [
            '函数', '二次函数', '方程', '解方程', '几何', '图形', '三角形', '四边形',
            '语法', '时态', '词汇', '单词', '阅读', '理解', '听力', '口语',
            '古诗', '诗词', '写作', '作文', '文言文', '现代文',
            '力学', '运动', '电学', '电路', '光学', '热学', '实验'
        ];
        
        commonKeywords.forEach(keyword => {
            if (text.includes(keyword)) {
                keywords.push(keyword);
            }
        });
        
        return keywords;
    }

    // 检测科目
    detectSubject(text) {
        if (text.includes('数学') || text.includes('函数') || text.includes('方程') || text.includes('几何')) {
            return '数学';
        } else if (text.includes('英语') || text.includes('语法') || text.includes('时态') || text.includes('词汇')) {
            return '英语';
        } else if (text.includes('语文') || text.includes('古诗') || text.includes('诗词') || text.includes('写作')) {
            return '语文';
        } else if (text.includes('物理') || text.includes('力学') || text.includes('电学') || text.includes('实验')) {
            return '物理';
        }
        return '其他';
    }

    // 真实API调用示例（需要配置API密钥）
    async callRealAIAPI(prompt) {
        if (!this.apiKey) {
            throw new Error('请先配置AI API密钥');
        }

        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: '你是一位专业的教育AI助手，专门为学生提供个性化的学习建议。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API调用失败: ${response.status}`);
        }

        const data = await response.json();
        return {
            suggestion: data.choices[0].message.content,
            analysis: 'AI分析结果',
            nextSteps: 'AI建议的下一步计划'
        };
    }

    // 学习趋势分析
    analyzeLearningTrend(feedbackHistory) {
        if (feedbackHistory.length < 2) {
            return { trend: '数据不足', confidence: 'low' };
        }

        const ratings = feedbackHistory.map(f => f.rating);
        const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        
        // 简单的趋势分析
        const recentRatings = ratings.slice(-3);
        const olderRatings = ratings.slice(0, -3);
        
        let trend = 'stable';
        if (recentRatings.length > 0 && olderRatings.length > 0) {
            const recentAvg = recentRatings.reduce((a, b) => a + b, 0) / recentRatings.length;
            const olderAvg = olderRatings.reduce((a, b) => a + b, 0) / olderRatings.length;
            
            if (recentAvg > olderAvg + 0.5) {
                trend = 'improving';
            } else if (recentAvg < olderAvg - 0.5) {
                trend = 'declining';
            }
        }

        return {
            trend,
            averageRating: avgRating.toFixed(1),
            confidence: feedbackHistory.length >= 5 ? 'high' : 'medium'
        };
    }

    // 生成学习报告
    generateLearningReport(studentData, feedbackHistory) {
        const trend = this.analyzeLearningTrend(feedbackHistory);
        
        return {
            studentName: studentData.name,
            subject: studentData.subject,
            totalFeedbacks: feedbackHistory.length,
            averageRating: trend.averageRating,
            learningTrend: trend.trend,
            lastFeedback: feedbackHistory[feedbackHistory.length - 1],
            recommendations: this.generateRecommendations(studentData, feedbackHistory)
        };
    }

    // 生成建议
    generateRecommendations(studentData, feedbackHistory) {
        const { subject, grade } = studentData;
        const recommendations = [];

        // 基于科目的建议
        const subjectRecommendations = {
            '数学': [
                '增加应用题练习',
                '建立错题本',
                '定期复习基础概念'
            ],
            '英语': [
                '增加词汇量训练',
                '多听英语音频',
                '练习英语写作'
            ],
            '语文': [
                '多读经典文学作品',
                '练习写作技巧',
                '背诵古诗词'
            ],
            '物理': [
                '多做实验题',
                '练习计算题',
                '整理公式体系'
            ]
        };

        recommendations.push(...(subjectRecommendations[subject] || subjectRecommendations['数学']));

        // 基于年级的建议
        if (grade === '小学') {
            recommendations.push('培养学习兴趣', '建立良好的学习习惯');
        } else if (grade === '初中') {
            recommendations.push('加强基础训练', '培养解题思维');
        } else if (grade === '高中') {
            recommendations.push('提升解题速度', '加强综合能力训练');
        }

        return recommendations;
    }
}

// 导出AI分析器
window.AIFeedbackAnalyzer = AIFeedbackAnalyzer; 