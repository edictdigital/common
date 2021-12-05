<h1 id="common-package">Common Package For Edict Digital LP Project</h1>

<h3 id="how-to-use-base-crud">How to Use Base CRUD</h3>

- Using Contoller
```typescript
@Controller('/api/some')
export class SomeController extends BaseController<Some> {
  constructor(private readonly someService: SomeService) {
    super(someService);
  }
}
```

- Using Service
```typescript
@Injectable()
export class SomeService extends BaseService<Some> {
  constructor(
    @InjectRepository(Some)
    private readonly someRepository: SomeRepository,
  ) {
    super(someRepository);
  }
}
```

NOT: Repository Repository\<Some\>'dan extend edilecek. Örneğin,
```typescript
@EntityRepository(Some)
export class SomeRepository extends Repository<Some> {
  async someAnotherFunction(...) {...}
}
```

- Using Entity
```typescript
import { MainEntity } from '@edictdigital/common';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("organizations")
export class Organization extends MainEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: "organization_key", unique: true })
  organizationKey: string;
}
```

<h3 id="new-version">How to Create New Version of NPMJS Packages</h3>

1. Kod değişiklikleri yapılır.
2. Local'de commit edilir.

```bash
# Feature Branch'ında iken
git status
git add .
git commit -m "[<branch-name>][<name>] message..."
```

3. Yeni versiyona geçilir.
```bash
npm version patch
```

4. Build edilir.
```bash
npm run build
```

5. NPMJS publish edilir.
```bash
npm publish
```

6. Tüm değişiklikler origin'e push edilir.
```bash
git push origin <branch-name>
```

7. Github'da master'a merge işlemi için pull request açılır ve merge edilir.
