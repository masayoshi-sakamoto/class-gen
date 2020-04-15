<template>
  <Company :value="entities" title="-- タイトル --" @save="save" @destroy="destroy" @update="update"></Company>
</template>

<script lang="ts">
import Vue from 'vue'
import authenticated from '@/middleware/authenticated'
import Company from '@/components/templates/Company'
import FetchCompaniesUseCase from '@/usecases/company/FetchCompaniesUseCase'
import SaveCompanyUseCase from '@/usecases/company/SaveCompanyUseCase'
import DeleteCompanyUseCase from '@/usecases/company/DeleteCompanyUseCase'
import UpdateCompaniesUseCase from '@/usecases/company/UpdateCompaniesUseCase'
import CompanyEntity from '@/entities/Company'

interface IData {
  entities: CompanyEntity[]
}

export default Vue.extend({
  middleware: [authenticated],
  components: {
    Company
  },
  async fetch({ App }) {
    const usecase1 = new FetchCompaniesUseCase(App)
    await Promise.all([usecase1.execute()])
  },
  data(): IData {
    return {
      entities: this.App.company.all()
    }
  },
  methods: {
    async save(entity: CompanyEntity) {
      const usecase = new SaveCompanyUseCase(this.App)
      this.App.state.loading = true
      if (await usecase.execute(entity)) {
        this.entities = this.App.company.all()
        this.App.state.setDialog('company', false)
      }
      this.App.state.loading = false
    },
    async destroy(entity: CompanyEntity) {
      const usecase = new DeleteCompanyUseCase(this.App)
      this.App.state.loading = true
      await usecase.execute(entity)
      this.entities = this.App.company.all()
      this.App.state.loading = false
    },
    async update(entities: CompanyEntity[]) {
      const usecase = new UpdateCompaniesUseCase(this.App)
      this.App.state.loading = true
      await usecase.execute(entities)
      this.entities = this.App.company.all()
      this.App.state.loading = false
    }
  },
  head() {
    return {
      title: '-- タイトル --'
    }
  }
})
</script>
