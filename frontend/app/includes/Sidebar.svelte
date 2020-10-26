<div class="sidebar">
    <div class="buttons">
        {#each buttons as button}
            <div class="button">
                <div class="icon">
                    <svelte:component this={button.icon}/>
                </div>
                <span>{ button.text }</span>
            </div>
        {/each}
    </div>
    {#each organisations as organisation}
        <div class="organisation">
            <div class="organisation-name-area">
                <span class="emoji">
                    <Emoji symbol={organisation.emoji}/>
                </span>
                <span class="name">{organisation.name}</span>
                <span class="dropdown" class:opened={organisation.opened} on:click={()=>toggleOpened(organisation)}>
                    <ChevronUp/>
                </span>
            </div>
            {#if organisation.opened}
                {#each organisation.groups as group}
                    <div class="group">
                        <div class="group-name-area">
                            <span class="name">{group.name}</span>
                        </div>
                        {#each group.pages as page}
                            <a href="{page.url}" class="page">
                                <span class="emoji">
                                    <Emoji symbol={page.emoji}/>
                                </span>
                                <span class="name">{page.name}</span>
                            </a>
                        {/each}
                    </div>
                {/each}
            {/if}
        </div>
    {/each}
</div>
<style lang="stylus">
@import 'stylus/variables'
    
.sidebar
    max-width 280px
    width 100%
    grid-area 1 / 1 / span 2 / span 1

.organisation
    border-top 1px solid mix($dark, transparent, 6%)
    padding-bottom 10px
    .organisation-name-area
        padding 6px 10px
        display flex
        align-items center
        .dropdown
            display inline-flex
            margin-left auto
            padding 4px
            border-radius 10px
            color mix($dark, transparent, 20%)
            cursor pointer
            &.opened
                transform rotate(180deg)
            &:hover
                background mix($dark, transparent, 5%)

        .name
            font-size 14px
            font-weight 600
            margin 0
    .emoji
        font-size 18px
        margin-right 3px
        line-height 100%

.group
    padding-bottom 8px
    .group-name-area
        padding 4px 10px
        display flex
        align-items center
        .name
            font-size 13px
            text-transform uppercase
            font-weight 600
            color mix($dark, transparent, 30%)
    .page
        display flex
        padding 4px 15px
        align-items center
        cursor pointer
        .name
            font-size 14px
            font-weight 500
            color mix($dark, transparent, 70%)
        &:hover
            background mix($dark, transparent, 5%)

.buttons
    display grid
    grid-template-columns 1fr 1fr
    padding 10px
    grid-gap 5px
    .button
        padding 8px 10px
        border-radius 5px
        cursor pointer
        font-weight 500
        display grid
        grid-template-columns min-content 1fr
        grid-gap 10px
        color mix($dark, transparent, 50%)
        .icon
            font-size 20px
            display inline-flex
        span
            font-size 14px
            display inline-flex
            align-items center
        &:hover
            color $dark
            background mix($dark, transparent, 4%)
</style>
<script>
import At from 'icons/At'
import Video from 'icons/Video'
import Magnify from 'icons/Magnify'
import Settings from 'icons/Settings'
import Pulse from 'icons/Pulse'
import Calendar from 'icons/Calendar'

import ChevronUp from 'icons/ChevronUp'
import Emoji from '@/components/Emoji'

function toggleOpened (org) {
    org.opened = !org.opened
    organisations = organisations
}

let buttons = [
    {
        text: 'Pings',
        icon: At
    },
    {
        text: 'Meet',
        icon: Video
    },
    {
        text: 'Search',
        icon: Magnify
    },
    {
        text: 'Settings',
        icon: Settings
    },
    {
        text: 'Activity',
        icon: Pulse
    },
    {
        text: 'Calendar',
        icon: Calendar
    },
]

let organisations = [
    {
        name: 'Insane Marketing',
        emoji: '🔭',
        opened: true,
        groups: [
            {
                name: 'workspace',
                pages: [
                    {
                        name: 'OS',
                        emoji: '🕹'
                    },
                    {
                        name: 'Tasks',
                        emoji: '📚'
                    },
                    {
                        name: 'General Chat',
                        emoji: '💵'
                    },
                    {
                        name: 'Company Vision',
                        emoji: '🚀'
                    },
                    {
                        name: 'Time Tracking',
                        emoji: '⏱'
                    }
                ]
            },
            {
                name: 'seo',
                pages: [
                    {
                        name: 'Tasks',
                        emoji: '📚'
                    },
                    {
                        name: 'Company Vision',
                        emoji: '🔭'
                    },
                    {
                        name: 'Time Tracking',
                        emoji: '📚'
                    },
                    {
                        name: 'Customers',
                        emoji: '⏱'
                    }
                ]
            },
        ]
    },
    {
        name: 'Vilicus Household',
        emoji: '💵',
        opened: false,
        groups: [
            {
                name: 'workspace',
                pages: [
                    {
                        name: 'OS',
                        emoji: '🕹'
                    },
                    {
                        name: 'Tasks',
                        emoji: '📚'
                    },
                    {
                        name: 'General Chat',
                        emoji: '💵'
                    },
                    {
                        name: 'Company Vision',
                        emoji: '🚀'
                    },
                    {
                        name: 'Time Tracking',
                        emoji: '⏱'
                    }
                ]
            },
            {
                name: 'seo',
                pages: [
                    {
                        name: 'Tasks',
                        emoji: '📚'
                    },
                    {
                        name: 'Company Vision',
                        emoji: '🔭'
                    },
                    {
                        name: 'Time Tracking',
                        emoji: '📚'
                    },
                    {
                        name: 'Customers',
                        emoji: '⏱'
                    }
                ]
            },
        ]
    }
]

</script>