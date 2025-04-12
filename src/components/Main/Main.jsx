import styles from './style.module.css'

const Main = () => {
  return (
    <main className={styles.main}>
      <div className={styles.firstSlide}>
        <div className={styles.firstSlideInclude1}>
          <div className="logo">
            <img src="src/resoures/img/logo.svg" alt="acscas" />
          </div>
          Learn English online and boost your skills with our engaging tools and
          materials.
        </div>
        <div className={styles.firstSlideInclude2}>
          Everything you find here has been specially created by the British
          Council, the world's English teaching experts.
        </div>
      </div>

      <div className={styles.secondSlide}>
        <div className={styles.secondSlideTitle}>
          We provide you with the right tools to help you interact confidently
          in the real world.
        </div>
        <div className={`${styles.secondSlideCards}`}>
          <div className={`${styles.firstCard} ${styles.secondSlideCard}`}>
            <div className={styles.secondSlideCardImg}></div>
            <div className={styles.CardContent}>
              <div className={styles.CardContentTitle}>Vocabulary</div>
              <div className={styles.CardContentDescription}>
                Expand your vocabulary and grow your confidence in speaking
                fluently.
              </div>
              <div className={styles.CardContentList}>
                <ul>
                  <li>
                    Interactive exercises to help you understand, pronounce, and
                    spell new words with ease.
                  </li>
                  <li>
                    Explore vocabulary related to a variety of real-life topics
                    and situations.
                  </li>
                  <li>
                    Boost your skills through fun word games that make learning
                    enjoyable.
                  </li>
                </ul>
              </div>
              <a href="#" className={styles.CardContentButton}>
                Start to learn
              </a>
            </div>
          </div>

          <div className={`${styles.secondCard} ${styles.secondSlideCard}`}>
            <div className={styles.secondSlideCardImg}></div>
            <div className={styles.CardContent}>
              <div className={styles.CardContentTitle}>Grammer</div>
              <div className={styles.CardContentDescription}>
                Review and practice grammar to strengthen your language skills
                and build confidence.
              </div>
              <div className={styles.CardContentList}>
                <ul>
                  <li>
                    Clear, simple explanations to help you understand and review
                    key grammar topics.
                  </li>
                  <li>
                    Interactive online exercises to test and reinforce your
                    understanding.
                  </li>
                  <li>
                    Use our grammar reference for deeper practice and detailed
                    guidance.
                  </li>
                </ul>
              </div>
              <a href="#" className={styles.CardContentButton}>
                Start to learn
              </a>
            </div>
          </div>

          <div className={`${styles.thirdCard} ${styles.secondSlideCard}`}>
            <div className={styles.secondSlideCardImg}></div>
            <div className={styles.CardContent}>
              <div className={styles.CardContentTitle}>Skills</div>
              <div className={styles.CardContentDescription}>
                Practice listening, reading, writing, and speaking — and learn
                useful language for work, study, or everyday conversations.
              </div>
              <div className={styles.CardContentList}>
                <ul>
                  <li>
                    Improve your listening and speaking with engaging audio and
                    video materials.
                  </li>
                  <li>
                    Explore model texts to help you develop your writing skills
                    for different tasks.
                  </li>
                  <li>
                    Strengthen your reading skills to read faster and understand
                    more clearly.
                  </li>
                </ul>
              </div>
              <a href="#" className={styles.CardContentButton}>
                Start to learn
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.thirdSlide}>
        <div className={styles.thirdSlideTitle}>
          Learn with one of our popular online courses
        </div>
        <div className={styles.thirdSlideCards}>
          <div className={styles.thirdSlideCard}>
            <img src="src/resoures/img/LiveCurs.png" alt="" srcset="" />
            <div className={styles.thirdSlideCardTitle}>Live classes</div>
            <div className={styles.thirdSlideCardText}>
              Group and one-to-one online classes with expert teachers.
            </div>
          </div>
          <div className={styles.thirdSlideCard}>
            <img src="src/resoures/img/Prepare.png" alt="" srcset="" />
            <div className={styles.thirdSlideCardTitle}>Exam preparation</div>
            <div className={styles.thirdSlideCardText}>
              Get the score you need with private and group online classes.
            </div>
          </div>
          <div className={styles.thirdSlideCard}>
            <img src="src/resoures/img/PersCoauch.png" alt="" srcset="" />
            <div className={styles.thirdSlideCardTitle}>Personal tutoring</div>
            <div className={styles.thirdSlideCardText}>
              Learn at your own pace with a self-study online course.
            </div>
          </div>
          <div className={styles.thirdSlideCard}>
            <img src="src/resoures/img/PersonalStud.png" alt="" srcset="" />
            <div className={styles.thirdSlideCardTitle}>Self-study courses</div>
            <div className={styles.thirdSlideCardText}>
              One-to-one online sessions focused on a personal plan.
            </div>
          </div>
        </div>
      </div>

      <div className={styles.fourthSlide}>
        <div className={styles.fourthSlideCards}>
          <div className={styles.fourthSlideCard}>
            <img src="src/resoures/img/increase_icon.png" alt="" srcset="" />
            <div className={styles.fourthSlideCardTitle}>
              Understand your English level
            </div>
            <div className={styles.fourthSlideCardText}>
              Learn more about the different CEFR levels and what learners at
              each level can do.
            </div>
          </div>
          <div className={styles.fourthSlideCard}>
            <img src="src/resoures/img/increase_icon.png" alt="" srcset="" />
            <div className={styles.fourthSlideCardTitle}>
              Understand your English level
            </div>
            <div className={styles.fourthSlideCardText}>
              Learn more about the different CEFR levels and what learners at
              each level can do.
            </div>
          </div>
        </div>
      </div>

      <div className={styles.fivethSlide}>
        <div className={styles.fivethSlideTitle}>
          Explore our site to improve your English with our bite-sized lessons,
          quizzes and games. With our varied selection of learning materials,
          you can practise your English for free.
        </div>
        <div className={styles.fivethSlideCards}>
          <div className={styles.fivethSlideCard}>
            <div className={styles.fivethSlideCardPoint}>
              <img
                src="src/resoures/img/check_mark_icon.png"
                alt=""
                srcset=""
              />
            </div>
            <div className={styles.fivethSlideCardContent}>
              <div className={styles.fivethSlideCardTitle}>Skills</div>
              <div className={styles.fivethSlideCardText}>
                Improve your English speaking, listening, reading and writing
              </div>
            </div>
          </div>
          <div className={styles.fivethSlideCard}>
            <div className={styles.fivethSlideCardPoint}>
              <img
                src="src/resoures/img/check_mark_icon.png"
                alt=""
                srcset=""
              />
            </div>
            <div className={styles.fivethSlideCardContent}>
              <div className={styles.fivethSlideCardTitle}>Grammar</div>
              <div className={styles.fivethSlideCardText}>
                Practise verb tenses and grammar rules
              </div>
            </div>
          </div>
          <div className={styles.fivethSlideCard}>
            <div className={styles.fivethSlideCardPoint}>
              <img
                src="src/resoures/img/check_mark_icon.png"
                alt=""
                srcset=""
              />
            </div>
            <div className={styles.fivethSlideCardContent}>
              <div className={styles.fivethSlideCardTitle}>Vocabulary</div>
              <div className={styles.fivethSlideCardText}>
                Learn new words to understand and express yourself clearly
              </div>
            </div>
          </div>
        </div>

        <a href="#" className={styles.fivethSlideButton}>
          Get Start
        </a>
      </div>
    </main>
  )
}
export default Main
