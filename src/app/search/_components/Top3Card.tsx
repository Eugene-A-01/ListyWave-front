import Image from 'next/image';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import * as styles from './Top3Card.css';
import { SearchListType } from '@/lib/types/listType';
import formatDate from '@/lib/utils/dateFormat';
import Top3CardItem from './Top3CardItem';
import DefaultProfile from '/public/icons/default_profile.svg';
import { searchLocale } from '@/app/search/locale';
import { useLanguage } from '@/store/useLanguage';
import { BACKGROUND_COLOR_READ } from '@/styles/Color';

export default function Top3Card({ list }: { list: SearchListType }) {
  const { language } = useLanguage();
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/list/${list.id}`);
  };

  const Top3CardComponent = useMemo(() => {
    return (
      <div
        className={styles.container}
        style={assignInlineVars({
          [styles.listColor]: `${BACKGROUND_COLOR_READ[list.backgroundColor as keyof typeof BACKGROUND_COLOR_READ]}`,
          [styles.listBackgroundImage]: `url(${list.representImageUrl})`,
        })}
        onClick={handleCardClick}
      >
        <div className={styles.card}>
          <div className={styles.listWrapper}>
            <ul>
              <ol className={styles.list}>
                {list.items.map((item, index) => {
                  if (index > 2) return;
                  return <Top3CardItem key={item.id} item={item} index={index} />;
                })}
              </ol>
            </ul>

            <div className={styles.userProfiles}>
              <div className={styles.userImageWrapper}>
                {list.ownerProfileImageUrl ? (
                  <Image
                    alt={searchLocale[language].profileImageAlt}
                    width={30}
                    height={30}
                    src={list.ownerProfileImageUrl}
                    className={styles.userImage}
                  />
                ) : (
                  <DefaultProfile width={'100%'} height={'100%'} />
                )}
              </div>
              <div className={styles.userTextWrapper}>
                <div className={styles.nameText}>{list.ownerNickname}</div>
                <div className={styles.updatedDateText}>{formatDate(list.updatedDate)}</div>
              </div>
            </div>
          </div>
          <h2 className={styles.title}>{list.title}</h2>
        </div>
      </div>
    );
  }, [list, handleCardClick]);

  return Top3CardComponent;
}
